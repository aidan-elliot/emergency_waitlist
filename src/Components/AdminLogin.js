import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function AdminLogin({ onAdminLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate(); // Use the useNavigate hook

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
    <div className="admin-login">
      <form onSubmit={handleSubmit}>
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
        {loginError && <p>Invalid credentials. Please try again.</p>}
      </form>
    </div>
  );
}

export default AdminLogin;
