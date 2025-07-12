import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NavigationBar from './NavigationBar';
import Logout from "./Logout";
import ProtectedRoute from './ProtectedRoute';

import { NotificationProvider } from './contexts/NotificationContext';
import { AuthTokenProvider } from './contexts/AuthTokenContext';

import './styles/App.css';

function App() {
    return (
        <AuthTokenProvider>
            <NotificationProvider>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                    />
                </Routes>
            </NotificationProvider>
        </AuthTokenProvider>
    );
}

export default App
