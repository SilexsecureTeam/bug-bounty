// src/hooks/useAuthToken.js

export function getAuthToken() {
  try {
    const data = localStorage.getItem("userData");
    console.log("LocalStorage userData:", data);
    if (!data) return null;

    const parsed = JSON.parse(data);
    console.log("Parsed token:", parsed?.token);
    return parsed?.token || null;
  } catch (error) {
    console.error("Error reading token from localStorage:", error);
    return null;
  }
}

export function saveAuthToken(token, user) {
  try {
    const userData = { token, user };
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("✅ Token saved successfully:", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
}

export function clearAuthToken() {
  localStorage.removeItem("userData");
  console.log("Token cleared from localStorage");
}
