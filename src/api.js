import { getAuthToken, saveAuthToken } from "./hooks/useAuthToken";

const normalizeBaseUrl = (url) => {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

const API_BASE_URL = normalizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL ?? "https://backend.defcomm.ng/api"
);

const ENCRYPT_KEY_PATTERN = /encrypt|otp_token|verification|session|access?_token/i;
const BASE64ish_REGEX = /^[A-Za-z0-9+/=]+$/;
const MIN_TOKEN_LENGTH = 8;

function isLikelyEncryptToken(value) {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  return trimmed.length >= MIN_TOKEN_LENGTH && BASE64ish_REGEX.test(trimmed);
}

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function searchForEncryptToken(payload) {
  if (!payload || typeof payload !== "object") return null;
  const stack = [payload];
  while (stack.length) {
    const current = stack.pop();
    if (!current || typeof current !== "object") continue;
    for (const [key, value] of Object.entries(current)) {
      if (typeof value === "string") {
        const trimmedValue = value.trim();
        if (!trimmedValue) continue;
        if (ENCRYPT_KEY_PATTERN.test(key)) return trimmedValue;
        if (isLikelyEncryptToken(trimmedValue)) return trimmedValue;
      }
      if (value && typeof value === "object") stack.push(value);
    }
  }
  return null;
}

export function extractEncryptToken(payload) {
  if (!payload) return null;
  if (typeof payload === "string") return payload;
  const directKey = Object.prototype.hasOwnProperty.call(payload, "encrypt")
    ? payload.encrypt
    : null;
  if (isLikelyEncryptToken(directKey)) return directKey;
  const nestedEncrypt = searchForEncryptToken(payload);
  if (nestedEncrypt) return nestedEncrypt;
  if (Array.isArray(payload)) {
    for (const item of payload) {
      const found = extractEncryptToken(item);
      if (found) return found;
    }
  }
  return null;
}

async function parseJsonSafely(response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new ApiError("The server returned an invalid response.", {
      status: response.status,
      data: text,
    });
  }
}

async function request(path, { method = "GET", headers = {}, body, skipContentType = false } = {}) {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const requestInit = {
    method,
    headers: {
      ...(!skipContentType ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body,
  };

  try {
    const response = await fetch(url, requestInit);
    const data = await parseJsonSafely(response);

    if (!response.ok) {
      const message = data?.message ?? `Request failed with status ${response.status}`;
      throw new ApiError(message, { status: response.status, data });
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message ?? "Unable to process request.");
  }
}

// ------------------ Auth APIs ------------------

export async function registerUser({
  firstName,
  lastName,
  username,
  email,
  phone,
  country,
  userType,
  password,
  groupname,
  companyname,
}) {
  const payload = {
    firstName,
    lastName,
    username,
    email,
    phone,
    country,
    user_type: userType,
    password,
    ...(groupname ? { groupname } : {}),
    ...(companyname ? { companyname } : {}),
  };

  return request("/bounty/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser({ userlogin, password }) {
  const payload = { userlogin, password };
  return request("/bounty/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyUserOtp({ userlogin, otp }) {
  const payload = { userlogin, otp };
  return request("/bounty/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function requestOtp({ userlogin }) {
  return request("/bounty/requestOtp", {
    method: "POST",
    body: JSON.stringify({ userlogin }),
  });
}

// ✅ Verify OTP for login and save token
export async function verifyLoginOtp({ userlogin, otp }) {
  const response = await fetch(`${API_BASE_URL}/bounty/loginVerify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userlogin, otp }),
  });

  const data = await response.json();

  if (!response.ok || data.status === "400") {
    throw new Error(data.message || "Wrong OTP. Try again!");
  }

  if (data.status === "200" && data.token) {
    saveAuthToken(data.token, data.user);
  }

  return data;
}

// ------------------ Public APIs ------------------

export async function fetchLeaderboard() {
  return request("/bounty/leaderboard", {
    method: "GET",
  });
}

// ------------------ Protected APIs ------------------

export async function fetchPrograms() {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");

  return request("/bounty/program", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ✅ Fetch Categories
export async function fetchCategories() {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");

  return request("/bounty/category", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ✅ Fetch User Profile
export async function fetchUserProfile() {
  const token = getAuthToken();
  ifif!token) throw new Error("User not authenticated");

  return request("/bounty/profile", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ✅ Fetch Report Info (Stats)
export async function fetchReportInfo() {
  const token = getAuthToken();
  ifif (!token) throw new Error("User not authenticated");

  return request("/bounty/reportInfo", {
    m erethod: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function fetchReportLogs() {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");

  return request("/bounty/reportlog", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function submitReport(formData) {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");

  return request("/bounty/report", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
    skipContentType: true,
  });
}

export async function submitGuestEvent(payload) {
  return request("/web/eventform", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ------------------ Helpers ------------------
export function getApiBaseUrl() {
  return API_BASE_URL;
}
