// lib/auth.js (new file)
export function checkAuthStatus() {
  if (typeof window === "undefined") return false;

  const isLoggedIn = localStorage.getItem("bloomcraft_logged_in");
  const userData = localStorage.getItem("bloomcraft_user");
  const token = localStorage.getItem("bloomcraft_token");

  if (!isLoggedIn || !userData || !token) {
    return false;
  }

  try {
    const user = JSON.parse(userData);
    // Optional: Check if token is expired
    if (user.tokenExpires && new Date(user.tokenExpires) < new Date()) {
      logout();
      return false;
    }
    return user;
  } catch {
    return false;
  }
}

export function logout() {
  localStorage.removeItem("bloomcraft_user");
  localStorage.removeItem("bloomcraft_logged_in");
  localStorage.removeItem("bloomcraft_token");
  localStorage.removeItem("bloomcraft_remember");
  window.location.href = "/register";
}
