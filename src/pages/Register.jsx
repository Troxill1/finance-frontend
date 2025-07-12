import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/auth.js';
import { useNotification } from '../contexts/NotificationContext.jsx';
import '../styles/Register.css';

const Register = () => {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [notifications, setNotifications] = useState([]);
    const { notify } = useNotification();
    const navigate = useNavigate();

    const updateName = (e) => setName(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateEmail = (e) => setEmail(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);
    const updateConfirmPassword = (e) => setConfirmPassword(e.target.value);

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (!(name && city && address)) {
            notify("Empty form field(s)", "warning");
            return;
        }
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            notify("Invalid email", "warning");
            return;
        }
        if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
            notify("Invalid password", "warning");
            return;
        }
        if (password !== confirmPassword) {
            notify("Mismatching passwords", "warning");
            return;
        }

        try {
            await registerUser(name, email, password);

            navigate("/login");
            notify("Successful registration", "success");       
        } catch (error) {
            const { message } = error;
            if (message === "Email already in use") {
                notify(message, "warning");
            } else {
                console.log(error);
                notify("Server error", "issue");
            }        
        }
    }

    return (
        <div className="registration">
            <form method="POST" className="registration" onSubmit={handleRegistration}>
                <h2 className="registration">Register</h2>
                <fieldset className="registration">
                    <legend>User info</legend>

                    <label htmlFor="full-name" className="registration">Full Name</label>
                    <input type="text" 
                        id="full-name" 
                        className="registration" 
                        placeholder="John Doe" 
                        autoComplete="on" 
                        onChange={updateName} 
                    />

                    <label htmlFor="city" className="registration">City, Country</label>
                    <input type="text"
                        id="city" 
                        className="registration" 
                        placeholder="Sofia, Bulgaria" 
                        onChange={updateCity} 
                    />

                    <label htmlFor="address" className="registration">Address</label>
                    <input type="address" 
                        id="address" 
                        className="registration" 
                        placeholder="Studentski grad, Block 59" 
                        autoComplete="on" 
                        onChange={updateAddress} 
                    />
                </fieldset>
                <fieldset className="registration">
                    <legend>Login info</legend>

                    <label htmlFor="email" className="registration">Email</label>
                    <input type="email" 
                        id="email" 
                        className="registration" 
                        placeholder="john.doe@example.com" 
                        autoComplete="on" 
                        onChange={updateEmail} 
                    />

                    <label htmlFor="password" className="registration">Password</label>
                    <input type="password" 
                        id="password" 
                        className="registration" 
                        onChange={updatePassword} 
                    />

                    <label htmlFor="confirm-password" className="registration">Confirm password</label>
                    <input type="password" 
                        id="confirm-password" 
                        className="registration" 
                        onChange={updateConfirmPassword} 
                    />  
                </fieldset>

                <button className="registration">Register</button>
                <p>Got an account? <Link to="/login" className="registration">Login!</Link></p>
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

export default Register;