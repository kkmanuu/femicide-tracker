import { login as apiLogin, register as apiRegister } from "../api/api";

export const checkAuth = async () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) return { isAuthenticated: false };
  return { isAuthenticated: true, user };
};

export const loginUser = async (credentials) => {
  try {
    const user = await apiLogin(credentials);
    localStorage.setItem("token", "mock-token");
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const user = await apiRegister(userData);
    localStorage.setItem("token", "mock-token");
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    throw error;
  }
};
