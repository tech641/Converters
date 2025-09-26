import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "../helper/helper"; // ✅ use the shared axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // boot: load token+user and set axios header
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userDataRaw = localStorage.getItem("user");

        if (token && userDataRaw) {
            try {
                const decoded = jwtDecode(token);
                const userData = JSON.parse(userDataRaw);
                setUser({ ...decoded, ...userData });
                api.defaults.headers.common.Authorization = `Bearer ${token}`; // ✅
            } catch {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }
        setLoading(false);
    }, []);

    const login = (token, userInfo) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userInfo));
        api.defaults.headers.common.Authorization = `Bearer ${token}`; // ✅

        const decoded = jwtDecode(token);
        setUser({ ...decoded, ...userInfo });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete api.defaults.headers.common.Authorization; // ✅
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
