import { getApiBaseUrl } from "./api"; 

const API_BASE_URL = getApiBaseUrl();
const ADMIN_SESSION_KEY = "adminSession";
const SESSION_TIMEOUT_MS = 60 * 60 * 1000; // 1 Hour Timeout

// --- Helper: Admin Token Management ---

export function getAdminSession() {
  try {
    const data = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!data) return null;

    const parsed = JSON.parse(data);
    const now = Date.now();

    // Check Timeout
    if (now - parsed.timestamp > SESSION_TIMEOUT_MS) {
      console.warn("Admin session expired.");
      logoutAdmin();
      return null;
    }

    return parsed;
  } catch (error) {
    console.error("Error reading admin session:", error);
    return null;
  }
}

export function saveAdminSession(token, user) {
  const sessionData = {
    token,
    user,
    timestamp: Date.now(), // Save login time
  };
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
}

export function logoutAdmin() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  window.location.href = "/admin/login"; // Force redirect
}

export class AdminApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
    this.data = data;
  }
}

async function adminRequest(path, { method = "GET", headers = {}, body } = {}) {
  const session = getAdminSession();
  const token = session?.token;

  // Append token if available
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();
    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      // ignore JSON parse error
    }

    if (!response.ok) {
        // Handle 401 Unauthorized globally for admins
      if (response.status === 401) {
        logoutAdmin();
      }
      throw new AdminApiError(data?.message || `Request failed: ${response.status}`, {
        status: response.status,
        data,
      });
    }

    return data;
  } catch (error) {
    if (error instanceof AdminApiError) throw error;
    throw new AdminApiError(error.message || "Network error");
  }
}

// --- Admin Auth APIs ---

export async function adminLogin({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message || "Login failed");
  }

  // ✅ FIX: Extract the inner 'data' object from the response
  // The API returns: { status: 200, message: "...", data: { access_token: "...", user: {...} } }
  const apiData = responseBody.data;

  if (!apiData) {
    throw new Error("Invalid Server Response: Missing data object");
  }

  const user = apiData.user;
  const accessToken = apiData.access_token;

  // Validate User is Admin
  const isNamedAdmin = user?.name?.toLowerCase().includes("admin");
  const isRoleAdmin = user?.role === "admin";

  if (!isNamedAdmin && !isRoleAdmin) {
     throw new Error("Access Denied: You do not have administrator privileges.");
  }

  // Save Token (access_token) and User
  saveAdminSession(accessToken, user);

  return responseBody;
}

// --- Example Protected Admin Endpoint ---
export async function fetchAdminDashboardStats() {
  return adminRequest("/admin/dashboard");
}


// --- Event Management APIs ---

// Fetch all events
export async function fetchEvents() {
  return adminRequest("/admin/form");
}

// Fetch applicants for an event
export async function fetchEventApplicants(eventId) {
  return adminRequest(`/admin/form/application/${eventId}`);
}

// Fetch approved attendance for an event
export async function fetchEventAttendance(eventId) {
  return adminRequest(`/admin/form/attendance/${eventId}`);
}

// Approve attendance for a user (GET request as specified)
export async function approveAttendance(eventId, userId) {
  return adminRequest(`/admin/form/attendance/${eventId}/${userId}`);
}

// --- Certificate APIs ---

// Fetch certificates for an event
export async function fetchEventCertificates(eventId) {
  return adminRequest(`/admin/form/certificate/${eventId}`);
}

// Create a certificate (Uses FormData, so explicit fetch used)
export async function createCertificate(formData) {
  const session = getAdminSession();
  const token = session?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(`${API_BASE_URL}/admin/form/certificate/create`, {
    method: "POST",
    headers: headers, // No Content-Type, let browser set boundary
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    let data = {};
    try { data = JSON.parse(text); } catch(e) {}
    throw new Error(data.message || "Failed to create certificate");
  }
  return await response.json();
}

// Update a certificate
export async function updateCertificate(formData) {
  const session = getAdminSession();
  const token = session?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(`${API_BASE_URL}/admin/form/certificate/update`, {
    method: "POST",
    headers: headers,
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    let data = {};
    try { data = JSON.parse(text); } catch(e) {}
    throw new Error(data.message || "Failed to update certificate");
  }
  return await response.json();
}

// Delete a certificate
export async function deleteCertificate(certificateId) {
  // Using GET based on pattern, but fallback to checking method if API changes
  return adminRequest(`/admin/form/certificate/delete/${certificateId}`);
}

// Fetch applicants for a specific certificate
export async function fetchCertificateApplicants(certificateId) {
  return adminRequest(`/admin/form/certificate/applicants/${certificateId}`);
}

// Mark certificate as collected
export async function collectCertificate(data) {
  return adminRequest(`/admin/form/certificate/applicants/collect`, {
    method: "POST",
    body: data
  });
}

// Send certificate email
export async function mailCertificate(data) {
  return adminRequest(`/admin/form/certificate/mail`, {
    method: "POST",
    body: data
  });
}

// --- Souvenir APIs (New) ---

// Fetch souvenirs for an event
export async function fetchEventSouvenirs(eventId) {
  return adminRequest(`/admin/form/souvenir/${eventId}`);
}

// Create a souvenir (Multipart/Form-Data)
export async function createSouvenir(formData) {
  const session = getAdminSession();
  const token = session?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(`${API_BASE_URL}/admin/form/souvenir/create`, {
    method: "POST",
    headers: headers,
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    let data = {};
    try { data = JSON.parse(text); } catch(e) {}
    throw new Error(data.message || "Failed to create souvenir");
  }
  return await response.json();
}

// Update a souvenir (Multipart/Form-Data)
export async function updateSouvenir(formData) {
  const session = getAdminSession();
  const token = session?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(`${API_BASE_URL}/admin/form/souvenir/update`, {
    method: "POST",
    headers: headers,
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to update souvenir");
  return await response.json();
}

// Delete a souvenir
export async function deleteSouvenir(souvenirId) {
  return adminRequest(`/admin/form/souvenir/delete/${souvenirId}`);
}

// Fetch applicants/claims for a specific souvenir
export async function fetchSouvenirApplicants(souvenirId) {
  return adminRequest(`/admin/form/souvenir/applicants/${souvenirId}`);
}

// Mark souvenir as collected
export async function collectSouvenir(data) {
  return adminRequest(`/admin/form/souvenir/applicants/collect`, {
    method: "POST",
    body: data
  });
}
