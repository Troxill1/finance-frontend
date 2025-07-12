import { useAuthToken } from "./contexts/AuthTokenContext";
import { Navigate } from "react-router-dom";
import { useNotification } from "./contexts/NotificationContext"; 

const ProtectedRoute = ({ children }) => {
    const { authToken } = useAuthToken();
    const { notify } = useNotification();

    if (!authToken) {
        notify("Log in to access this page", "warning");
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
