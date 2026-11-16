import axios from "axios";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

export const login = async (email, password) => {
  const response = await axios.post(`${BACKEND_URL}/login`, {
    email: email,
    password: password,
  });

  const token = response.data.token || response.data.data?.token;
  if (token) {
    localStorage.setItem("token", token);
  }

  return response.data;
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  try {
    if (token) {
      await axios.get(
        `${BACKEND_URL}/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
    }
  } catch (error) {
    console.error("Logout request failed:", error);
  } finally {
    localStorage.removeItem("token");
  }
};

export const getMe = async () => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (token && token !== "null" && token !== "undefined") {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.get(`${BACKEND_URL}/me`, {
    headers,
  });

  return response.data.data;
};
