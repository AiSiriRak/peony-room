import axios from "axios";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

export const register = async (
  name,
  telephoneNumber,
  email,
  password,
  role,
) => {
  const response = await axios.post(`${BACKEND_URL}/register`, {
    name: name,
    telephoneNumber: telephoneNumber,
    email: email,
    password: password,
    role: role,
  });

  const token = response.data.token || response.data.data?.token;
  if (token) {
    localStorage.setItem("token", token);
  }

  return response.data;
};

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
