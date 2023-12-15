import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import './App.css';

function LoginScreen({ onLogin }) {
    const [role, setRole] = useState('');
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleLogin = (userRole) => {
        setRole(userRole);
        onLogin(userRole); // Propagate role upwards to the parent component
        if (userRole === 'admin') {
            navigate('/admin-login'); // Navigate to admin login page
        }
    };

    return (
        <div className="login-screen">
            <button onClick={() => handleLogin('admin')}>Login as Admin</button>
            <button onClick={() => navigate('/register-patient')}>Register as Patient</button>
            <button onClick={() => navigate('/patient-login')}>Patient Code Login</button> {/* New button */}
        </div>
    );
}

export default LoginScreen;


