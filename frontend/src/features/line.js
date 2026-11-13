import axios from "axios";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/line`;

export const getLineLink = async () => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (token && token !== "null" && token !== "undefined") {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.post(
    `${BACKEND_URL}/link-code`,
    {},
    { headers },
  );

  return response.data;
};
