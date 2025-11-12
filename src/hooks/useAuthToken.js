// src/hooks/useAuthToken.js
export function getAuthToken() {
  try {
    const data = localStorage.getItem("userData");
    console.log(data)
    if (!data) return null;
    const parsed = JSON.parse(data);
    return parsed?.token || null;
  } catch {
    return null;
  }
}
