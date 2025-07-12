import { useState, createContext, useContext } from "react";

const AuthTokenContext = createContext();

export const AuthTokenProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => {
        return localStorage.getItem("authToken");
    });

    const setToken = (token) => {
        if (token) {
            localStorage.setItem("authToken", token);
            setAuthToken(token);
        } else {
            localStorage.removeItem("authToken");
            setAuthToken(null);
        }
    }

    return (
        <AuthTokenContext.Provider value={{ authToken, setToken }}>
            {children}
        </AuthTokenContext.Provider>
    );
};

export const useAuthToken = () => useContext(AuthTokenContext);
