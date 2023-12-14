import React, { useState } from 'react';
import './App.css';

function PatientRegistration() {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    address: '',
    injuryType: '',
    painScale: '',
  });
  const [assignedCode, setAssignedCode] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleChange = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientInfo.name || !patientInfo.address || !patientInfo.injuryType || !patientInfo.painScale) {
      setRegistrationStatus('Please fill out all fields.');
      return;
    }
    setRegistrationStatus('Registering...');
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientInfo),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAssignedCode(data.loginCode);
      setRegistrationStatus('Registration Successful. Your assigned code is displayed below.');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setRegistrationStatus('Registration Failed. Please try again.');
    }
  };

  return (
    <div className="patient-registration">
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={patientInfo.name} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={patientInfo.address} onChange={handleChange} required />
        </label>
        <label>
          Injury Type:
          <input type="text" name="injuryType" value={patientInfo.injuryType} onChange={handleChange} required />
        </label>
        <label>
          Pain Scale (1-10):
          <input type="number" name="painScale" min="1" max="10" value={patientInfo.painScale} onChange={handleChange} required />
        </label>
        <button type="submit">Register</button>
      </form>
      {assignedCode && <p>Your Assigned Code: {assignedCode}</p>}
      <p>{registrationStatus}</p>
    </div>
  );
}

export default PatientRegistration;