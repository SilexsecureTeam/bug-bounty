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
    timestamp: Date.now(), 
  };
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
}

export function logoutAdmin() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  window.location.href = "/admin/login"; 
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
    try { data = text ? JSON.parse(text) : {}; } catch (e) {}

    if (!response.ok) {
      if (response.status === 401) logoutAdmin();
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

export async function requestAdminOtp(identifier) {
  const response = await fetch(`${API_BASE_URL}/requestOtpSms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: identifier }),
  });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to send OTP");
  return responseBody;
}

export async function verifyAdminOtpAndLogin({ identifier, otp }) {
  const response = await fetch(`${API_BASE_URL}/loginWithPhone`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: identifier, otp: otp }),
  });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Login failed");
  
  const apiData = responseBody.data;
  if (!apiData) throw new Error("Invalid Server Response: Missing data object");

  const user = apiData.user;
  const accessToken = apiData.access_token;
  const role = user?.role ? user.role.toLowerCase() : "";
  const allowedRoles = ["admin", "volunteer"];

  if (!allowedRoles.includes(role)) {
     throw new Error("Access Denied: Restricted to Admins and Volunteers.");
  }
  saveAdminSession(accessToken, user);
  return responseBody;
}

export async function fetchAdminDashboardStats() {
  return adminRequest("/admin/dashboard");
}

// --- Team (User Account) APIs ---
export async function fetchTeams() {
  return adminRequest("/admin/account");
}
export async function createTeam(formData) {
  const session = getAdminSession();
  const token = session?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${API_BASE_URL}/admin/account/create`, {
    method: "POST",
    headers: headers,
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create team member");
  return await response.json();
}
export async function changeTeamStatus(id, status) {
  return adminRequest(`/admin/account/${id}/${status}`); 
}

// --- Group Management APIs ---
export async function fetchGroups() {
  return adminRequest("/admin/group");
}
export async function createGroup(formData) {
  const session = getAdminSession();
  const token = session?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${API_BASE_URL}/admin/group/create`, {
    method: "POST",
    headers: headers,
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create group");
  return await response.json();
}
export async function updateGroup(formData) {
  const session = getAdminSession();
  const token = session?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${API_BASE_URL}/admin/group/update`, {
    method: "POST",
    headers: headers,
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to update group");
  return await response.json();
}
export async function addGroupMember(data) {
  return adminRequest(`/admin/group/member/add`, { method: "POST", body: data });
}
export async function fetchGroupMembers(id) {
  return adminRequest(`/admin/group/member/${id}`);
}
export async function removeGroupMember(data) {
  return adminRequest(`/admin/group/member/remove`, { method: "POST", body: data });
}

// --- Event Management APIs ---
export async function fetchEvents() {
  return adminRequest("/admin/form");
}
export async function createEvent(data) {
  return adminRequest("/admin/form/create", { method: "POST", body: data });
}
export async function updateEvent(data) {
  return adminRequest("/admin/form/update", { method: "POST", body: data });
}
export async function deleteEvent(id) {
  return adminRequest(`/admin/form/delete/${id}`); 
}
export async function fetchEventApplicants(eventId) {
  return adminRequest(`/admin/form/application/${eventId}`);
}
export async function fetchEventAttendance(eventId) {
  return adminRequest(`/admin/form/attendance/${eventId}`);
}
export async function approveAttendance(eventId, userId) {
  return adminRequest(`/admin/form/attendance/${eventId}/${userId}`);
}

// --- Certificate APIs ---
export async function fetchEventCertificates(eventId) {
  return adminRequest(`/admin/form/certificate/${eventId}`);
}
export async function createCertificate(formData) {
  const session = getAdminSession();
  const token = session?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${API_BASE_URL}/admin/form/certificate/create`, {
    method: "POST",
    headers: headers,
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create certificate");
  return await response.json();
}
export async function updateCertificate(formData) {
  const session = getAdminSession();
  const token = session?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${API_BASE_URL}/admin/form/certificate/update`, {
    method: "POST",
    headers: headers,
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to update certificate");
  return await response.json();
}
export async function deleteCertificate(certificateId) {
  return adminRequest(`/admin/form/certificate/delete/${certificateId}`);
}
export async function fetchCertificateApplicants(certificateId) {
  return adminRequest(`/admin/form/certificate/applicants/${certificateId}`);
}
export async function collectCertificate(data) {
  return adminRequest(`/admin/form/certificate/applicants/collect`, {
    method: "POST",
    body: data
  });
}
export async function mailCertificate(data) {
  return adminRequest(`/admin/form/certificate/mail`, {
    method: "POST",
    body: data
  });
}

// --- Souvenir APIs ---
export async function fetchEventSouvenirs(eventId) {
  return adminRequest(`/admin/form/souvenir/${eventId}`);
}
export async function createSouvenir(formData) {
  const session = getAdminSession();
  const token = session?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${API_BASE_URL}/admin/form/souvenir/create`, {
    method: "POST",
    headers: headers,
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create souvenir");
  return await response.json();
}
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
export async function deleteSouvenir(souvenirId) {
  return adminRequest(`/admin/form/souvenir/delete/${souvenirId}`);
}
export async function fetchSouvenirApplicants(souvenirId) {
  return adminRequest(`/admin/form/souvenir/applicants/${souvenirId}`);
}
export async function collectSouvenir(data) {
  return adminRequest(`/admin/form/souvenir/applicants/collect`, {
    method: "POST",
    body: data
  });
}

// --- Notification APIs ---
export async function fetchNotifications() {
  return adminRequest("/admin/notification");
}
export async function createNotification(formData) {
  const session = getAdminSession();
  const token = session?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${API_BASE_URL}/admin/notification/create`, {
    method: "POST",
    headers: headers,
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create notification");
  return await response.json();
}
export async function updateNotification(formData) {
  const session = getAdminSession();
  const token = session?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${API_BASE_URL}/admin/notification/edit`, {
    method: "POST", 
    headers: headers,
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to update notification");
  return await response.json();
}
export async function deleteNotification(id) {
  return adminRequest(`/admin/notification/delete/${id}`);
}
// --- File & Document Management APIs ---

export async function fetchFiles() {
  return adminRequest("/admin/file");
}

export async function fetchUserFiles() {
  return adminRequest("/admin/file/user");
}

export async function fetchFileRequests() {
  return adminRequest("/admin/file/request");
}

export async function viewFile(id) {
  return adminRequest(`/admin/file/view/${id}`);
}

export async function downloadFile(id) {
  return adminRequest(`/admin/file/download/${id}`);
}

export async function uploadFile(formData) {
  const session = getAdminSession();
  const token = session?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${API_BASE_URL}/admin/file/upload`, {
    method: "POST",
    headers: headers,
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to upload file");
  return await response.json();
}

export async function fetchFileGroupShares(id) {
  return adminRequest(`/admin/file/share/group/${id}`);
}

export async function addFileGroupShare(data) {
  return adminRequest(`/admin/file/share/group/add`, { method: "POST", body: data });
}

export async function fetchFileUserShares(id) {
  return adminRequest(`/admin/file/share/user/${id}`);
}

export async function addFileUserShare(data) {
  return adminRequest(`/admin/file/share/user/add`, { method: "POST", body: data });
}

export async function fetchFileGroupAccess(id) {
  return adminRequest(`/admin/file/access/group/${id}`);
}

export async function fetchFileUserAccess(id) {
  return adminRequest(`/admin/file/access/user/${id}`);
}

export async function revokeFileAccess(id) {
  return adminRequest(`/admin/file/access/${id}/revoke`);
}

export async function fetchFileAccessLog(id) {
  return adminRequest(`/admin/file/access/${id}/log`);
}

export async function acceptFileRequest(id) {
  return adminRequest(`/admin/file/${id}/accept`);
}

export async function declineFileRequest(id) {
  return adminRequest(`/admin/file/${id}/decline`);
}
