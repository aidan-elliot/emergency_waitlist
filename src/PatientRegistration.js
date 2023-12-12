import React, { useState } from 'react';
import './App.css';

function PatientRegistration() {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    address: '',
    injury: '',
    painScale: '',
  });
  const [assignedCode, setAssignedCode] = useState(null);

  const handleChange = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientInfo),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAssignedCode(data.loginCode); // Set the assigned code from the response
      alert(`Your assigned code: ${data.loginCode}`); // Show an alert with the assigned code
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="patient-registration">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={patientInfo.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={patientInfo.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="injury"
          placeholder="Injury Type"
          value={patientInfo.injury}
          onChange={handleChange}
        />
        <input
          type="number"
          name="painScale"
          placeholder="Pain Scale (1-10)"
          value={patientInfo.painScale}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      {assignedCode && <p>Your Assigned Code: {assignedCode}</p>} {/* Display assigned code */}
    </div>
  );
}

export default PatientRegistration;
