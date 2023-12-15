// Importing necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import './PatientLogin.css';
import logo from './HospitalApplogo-removebg-preview.png';

// Defining the PatientLogin component
function PatientLogin() {
  // State variables
  const [code, setCode] = useState('');
  const [patientInfo, setPatientInfo] = useState(null);
  const [waitTime, setWaitTime] = useState(null);

  // Event handler for code input change
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Fetching patient info from the server
      const response = await axios.get(`/api/patients/code/${code}`);
      setPatientInfo(response.data.patient);
      setWaitTime(response.data.waitTime);
    } catch (error) {
      console.error('Error fetching patient info:', error);
      alert('Error fetching patient info. Please check the code and try again.');
    }
  };

  // Rendering the component
  return (
    <div className="patient-login-container">
      <form onSubmit={handleSubmit} className="patient-login-form">
        <img src={logo} alt="Hospital Logo" className="registration-logo" />
        <h1 className="registration-title">Patient Login</h1>
        <input
          type="text"
          value={code}
          onChange={handleCodeChange}
          placeholder="Enter your code"
          required
        />
        <button type="submit">Check Status</button>
      </form>

      {patientInfo && (
        <div className="patient-details">
          {waitTime !== null && (
            <p className="wait-time">
              <strong>Estimated Wait Time:</strong> {waitTime} minutes
            </p>
          )}
          <p className="patient-name">
            <strong>Name:</strong> {patientInfo.name}
          </p>
          <p className="patient-address">
            <strong>Address:</strong> {patientInfo.address}
          </p>
          <p className="patient-injury">
            <strong>Injury:</strong> {patientInfo.injury}
          </p>
          <p className="patient-pain-scale">
            <strong>Pain Scale:</strong> {patientInfo.painScale}
          </p>
        </div>
      )}
    </div>
  );
}

// Exporting the PatientLogin component
export default PatientLogin;
