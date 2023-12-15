import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './HospitalApplogo-removebg-preview.png';
import './AdminLogin.css'; // Ensure you have this CSS file

function AdminLogin({ onAdminLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    // When the component mounts, change the body background color
    document.body.style.backgroundColor = '#2a2d37'; // Dark background color

    // When the component unmounts, reset the body background color
    return () => {
      document.body.style.backgroundColor = ''; // Reset to default or previous color
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === '123456') {
      onAdminLogin(true); // Successful login
      navigate('/dashboard'); // Navigate to the dashboard page
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-header">
        <img src={logo} alt="Hospital Logo" className="login-logo" />
        <h1 className="login-title">Web ER - Admin</h1>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <input 
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {loginError && <p className="login-error">Invalid credentials. Please try again.</p>}
      </form>
    </div>
  );
}

export default AdminLogin;
