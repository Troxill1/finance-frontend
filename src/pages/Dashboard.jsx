import { useEffect } from "react";
import { useAuthToken } from "../contexts/AuthTokenContext";

const Dashboard = () => {
    const { authToken } = useAuthToken();

    useEffect(() => {
        console.log(authToken);
    });
}

export default Dashboard;