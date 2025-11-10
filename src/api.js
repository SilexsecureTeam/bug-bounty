const normalizeBaseUrl = (url) => {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL ?? "https://backend.defcomm.ng/api");

const ENCRYPT_KEY_PATTERN = /encrypt|otp_token|verification|session|access?_token/i;

const BASE64ish_REGEX = /^[A-Za-z0-9+/=]+$/;
const MIN_TOKEN_LENGTH = 8;

function isLikelyEncryptToken(value) {
  if (typeof value !== "string") {
    return false;
  }

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
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const stack = [payload];

  while (stack.length) {
    const current = stack.pop();
    if (!current || typeof current !== "object") {
      continue;
    }

    for (const [key, value] of Object.entries(current)) {
      if (typeof value === "string") {
        const trimmedValue = value.trim();
        if (!trimmedValue) {
          continue;
        }

        if (ENCRYPT_KEY_PATTERN.test(key)) {
          return trimmedValue;
        }

        if (isLikelyEncryptToken(trimmedValue)) {
          return trimmedValue;
        }
      }

      if (value && typeof value === "object") {
        stack.push(value);
      }
    }
  }

  return null;
}

export function extractEncryptToken(payload) {
  if (!payload) {
    return null;
  }

  if (typeof payload === "string") {
    return payload;
  }

  const directKey = Object.prototype.hasOwnProperty.call(payload, "encrypt") ? payload.encrypt : null;
  if (isLikelyEncryptToken(directKey)) {
    return directKey;
  }

  const nestedEncrypt = searchForEncryptToken(payload);
  if (nestedEncrypt) {
    return nestedEncrypt;
  }

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const found = extractEncryptToken(item);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

async function parseJsonSafely(response) {
  const text = await response.text();
  if (!text) {
    return {};
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new ApiError("The server returned an invalid response.", {
      status: response.status,
      data: text
    });
  }
}

async function request(path, { method = "GET", headers = {}, body, skipContentType = false } = {}) {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const requestInit = {
    method,
    headers: {
      ...(!skipContentType ? { "Content-Type": "application/json" } : {}),
      ...headers
    },
    body
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
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message ?? "Unable to process request.");
  }
}

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
  companyname
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
    ...(companyname ? { companyname } : {})
  };

  return request("/bounty/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}


export async function loginUser({ userlogin, password }) {
  const payload = {
    userlogin,
    password
  };

  return request("/bounty/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function verifyUserOtp({ userlogin, otp }) {
  const payload = {
    userlogin,
    otp
  };

  return request("/bounty/verify", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}
