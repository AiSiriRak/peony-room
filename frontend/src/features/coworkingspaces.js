import axios from "axios";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/coworking-spaces`;

export const getCoworkingSpace = async (coworkingSpaceID) => {
  const response = await axios.get(`${BACKEND_URL}/${coworkingSpaceID}`);

  return response.data.data;
};
