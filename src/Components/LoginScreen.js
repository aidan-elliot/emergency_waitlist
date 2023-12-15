import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './LoginScreen.css';
import logo from './HospitalApplogo-removebg-preview.png';

// Define the LoginScreen component
function LoginScreen({ onLogin }) {
    const [role, setRole] = useState(''); // Define a state variable for the user role
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    // Handle the login action
    const handleLogin = (userRole) => {
        setRole(userRole); // Update the user role state
        onLogin(userRole); // Call the onLogin function passed as a prop
        if (userRole === 'admin') {
            navigate('/admin-login'); // Navigate to the admin login page
        }
    };

    // Render the LoginScreen component
    return (
        <div className="login-screen">
            <div className="login-header">
                <img src={logo} alt="Hospital Logo" className="login-logo" />
                <h1 className="login-title">Web ER</h1>
            </div>
            <button onClick={() => handleLogin('admin')}>Login as Admin</button>
            <button onClick={() => navigate('/register-patient')}>Register as Patient</button>
            <button onClick={() => navigate('/patient-login')}>Patient Code Login</button>
        </div>
    );
}

export default LoginScreen; // Export the LoginScreen component
