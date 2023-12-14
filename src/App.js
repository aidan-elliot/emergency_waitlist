import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginScreen from './Components/LoginScreen';
import AdminLogin from './Components/AdminLogin';
import Dashboard from './Components/dashboard';
import PatientRegistration from './Components/PatientRegistration'; // Adjust the path as necessary
import './Components/App.css';

function App() {
  const [userRole, setUserRole] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleLogin = (role) => {
    setUserRole(role);
  };

  const handleAdminLogin = (success) => {
    setIsAdminLoggedIn(success);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Route for the root path */}
          <Route path="/" element={<LoginScreen onLogin={handleLogin} />} />

          {/* Route for admin login */}
          <Route path="/admin-login" element={<AdminLogin onAdminLogin={handleAdminLogin} />} />

          {/* Route for patient registration */}
          <Route path="/register-patient" element={<PatientRegistration />} />

          {/* Route for the admin dashboard */}
          {isAdminLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
