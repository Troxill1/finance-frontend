import { apiRequest } from "./api";

export const registerUser = async (username, email, password) => {
    return await apiRequest("auth/register", "POST", { username, email, password });
};

export const loginUser = async (email, password) => {
    return await apiRequest("auth/login", "POST", { email, password });
};

export const getMe = async (token) => {
    return await apiRequest("auth/me", "GET", null, token);
};

export const logoutUser = async (token) => {
    return await apiRequest("auth/logout", "POST", null, token);
};