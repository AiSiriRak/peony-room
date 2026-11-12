import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email: email, password: password })

    const token = response.data.token || response.data.data?.token;
    if (token) {
        localStorage.setItem("token", token);
    }

    return response.data
}

export const getMe = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
        `${API_URL}/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        },
    );

    return response.data.data;
};