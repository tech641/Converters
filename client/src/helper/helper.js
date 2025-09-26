import axios from "axios";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:3000/api";

export const api = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    const msg = err.response?.data?.message || err.message || "Request failed.";
    return Promise.reject(new Error(msg));
  }
);



// POST Routes

// Api for register user   -  POST 
export async function registerUser(payload) {
    try {
        const { data } = await api.post("/auth/register", payload);
        return data; 
    } catch (err) {
        const msg = err.response?.data?.message || err.message || "Unable to create account.";
        throw new Error(msg);
    }
}

// Api for login users     -  POST 
export async function loginUser(payload) {
    try {
        const { data } = await api.post("/auth/login", payload);
        return data; 
    } catch (err) {
        const msg = err.response?.data?.message || err.message || "Unable to sign in.";
        throw new Error(msg);
    }
}
