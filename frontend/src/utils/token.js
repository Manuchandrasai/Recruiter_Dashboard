// src/utils/token.js

const USER_KEY = "loggedInUser";

// ✅ Save the logged-in user (after login)
export function saveLoggedInUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// ✅ Get the current logged-in user (or null if not logged in)
export function getLoggedInUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

// ✅ Check if user is authenticated
export function isAuthenticated() {
  return !!getLoggedInUser();
}

// ✅ Clear auth (log out)
export function clearAuth() {
  localStorage.removeItem(USER_KEY);
}
