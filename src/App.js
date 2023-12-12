import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import AdminLogin from './AdminLogin';
import Dashboard from './dashboard';
import PatientPortal from './PatientPortal';
import PatientRegistration from './PatientRegistration';
import './App.css';

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

          {/* Route for the patient portal */}
          <Route path="/patient-portal" element={<PatientPortal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
