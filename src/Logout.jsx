import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "./contexts/AuthTokenContext";

const Logout = () => {
    const { setToken } = useAuthToken();
    const navigate = useNavigate();

    useEffect(() => {
        setToken(null);
        navigate("/login");
    }, [])
};

export default Logout;