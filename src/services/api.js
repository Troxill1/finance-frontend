const API_BASE_URL = "http://localhost:5000/api";

export const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(`${API_BASE_URL}/${endpoint}`, options);
    const data = await res.json();
    
    if (!res.ok) {
        throw new Error(data.message || "API request failed");
    }


    return data;
};