import React, { useState } from 'react';

function PatientRegistration() {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    address: '',
    injuryType: '',
    painScale: '',
  });
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
      await response.json();
      setRegistrationStatus('Registration Successful.');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setRegistrationStatus('Registration Failed. Please try again.');
    }
  };

  return (
    <div className="patient-registration">
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={patientInfo.name} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={patientInfo.address} onChange={handleChange} required />
        <input type="text" name="injuryType" placeholder="Injury Type" value={patientInfo.injuryType} onChange={handleChange} required />
        <input type="number" name="painScale" placeholder="Pain Scale (1-10)" value={patientInfo.painScale} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {registrationStatus && <p>{registrationStatus}</p>}
    </div>
  );
}

export default PatientRegistration;
