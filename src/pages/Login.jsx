import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/auth.js';
import { useNotification } from '../contexts/NotificationContext.jsx';
import { useAuthToken } from '../contexts/AuthTokenContext.jsx';
import '../styles/Register.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [notifications, setNotifications] = useState([]);
    const { notify } = useNotification();

    const navigate = useNavigate();
    const { setToken } = useAuthToken();

    const updateEmail = (e) => setEmail(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            notify("Invalid email format", "warning");
            return;
        }
        if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
            notify("Invalid password", "warning");
            return;
        }

        try {
            const res = await loginUser(email, password);
            await setToken(res.token);
            navigate("/dashboard");
        } catch (error) {
            const { message } = error;
            if (["Incorrect password", "User not found"].includes(message)) {
                notify(message, "warning");
            } else {
                console.log(error);
                notify("Server error", "issue");
            }     
        }
    }

    return (
        <div className="registration">
            <form method="POST" className="registration" onSubmit={handleLogin}>
                <h2 className="registration">Login</h2>
                <fieldset className="registration">
                    <legend>Login info</legend>

                    <label htmlFor="email" className="registration">Email</label>
                    <input type="email" 
                        id="email" 
                        className="registration" 
                        autoComplete="on" 
                        onInput={updateEmail} 
                    />

                    <label htmlFor="password" className="registration">Password</label>
                    <input type="password" 
                        id="password" 
                        className="registration" 
                        onChange={updatePassword} 
                    />
                </fieldset>

                <button className="registration">Login</button>
                <p>Don't have an account? <Link to="/" className="registration">Register!</Link></p>
                <p>Forgot password?</p>  {/* TODO: make a popup window */}
            </form>
            <div id="notification-stack">
                {notifications.map((note) => (
                    <Notification
                        key={note.id}
                        message={note.message}
                        type={note.type}
                        onDismiss={() =>
                            setNotifications((prev) => prev.filter((n) => n.id !== note.id))
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export default Login;