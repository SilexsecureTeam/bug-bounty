import { getApiBaseUrl } from "./api"; // Re-using the base URL from your existing api.js

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
  // Using the base /login endpoint as requested
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  // Validate User is Admin
  // Checking if name is 'admin' or explicit admin role if available
  const isNamedAdmin = data.user?.name?.toLowerCase().includes("admin");
  const isRoleAdmin = data.user?.role === "admin"; // specific backend field if exists

  if (!isNamedAdmin && !isRoleAdmin) {
     throw new Error("Access Denied: You do not have administrator privileges.");
  }

  // Save Token (access_token) and User
  saveAdminSession(data.access_token, data.user);

  return data;
}

// --- Example Protected Admin Endpoint ---
export async function fetchAdminDashboardStats() {
  return adminRequest("/admin/stats");
}
