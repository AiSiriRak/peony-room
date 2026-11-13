import axios from "axios";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/coworking-spaces`;

export const getCoworkingSpaces = async () => {
  const response = await axios.get(BACKEND_URL);

  return response.data;
};
