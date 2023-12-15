// Importing necessary dependencies
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

// Importing components
import LoginScreen from './Components/LoginScreen';
import AdminLogin from './Components/AdminLogin';
import Dashboard from './Components/dashboard';
import PatientRegistration from './Components/PatientRegistration';
import './Components/App.css';
import PatientLogin from './Components/PatientLogin';

// Main App component
function App() {
  // State variables
  const [userRole, setUserRole] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Function to handle user login
  const handleLogin = (role) => {
    setUserRole(role);
  };

  // Function to handle admin login
  const handleAdminLogin = (success) => {
    setIsAdminLoggedIn(success);
  };

  // Rendering the component
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LoginScreen onLogin={handleLogin} />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/admin-login" element={<AdminLogin onAdminLogin={handleAdminLogin} />} />
          <Route path="/register-patient" element={<PatientRegistration />} />
          {isAdminLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
