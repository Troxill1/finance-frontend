import React from 'react';
import { Link } from 'react-router-dom';
import './styles/NavigationBar.css';

const NavigationBar = () => {
    return (
        <React.Fragment>
            <nav>
                <ul className="nav-container">
                    <li key="dashboard" className="nav-item">
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li key="logout" className="nav-item">
                        <Link to="/logout">Logout</Link>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
}

export default NavigationBar;