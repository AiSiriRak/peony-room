import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/invitations`;

export const getInvitations = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    return response.data
}

export const respondInvitation = async (id, status) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
        `${API_URL}/${id}`,
        { status: status },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data
}
