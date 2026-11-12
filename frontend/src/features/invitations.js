import axios from "axios";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/invitations`;

export const getInvitations = async () => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (token && token !== "null" && token !== "undefined") {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.get(BACKEND_URL, { headers });

  return response.data;
};

export const respondInvitation = async (invitationId, status) => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (token && token !== "null" && token !== "undefined") {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.put(
    `${BACKEND_URL}/${invitationId}`,
    { status },
    {
      headers,
    },
  );

  return response.data;
};
