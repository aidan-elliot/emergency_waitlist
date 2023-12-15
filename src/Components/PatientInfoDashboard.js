import React, { useState, useEffect } from 'react';
import './PatientInfoDashboard.css'; // New CSS file for this component

function PatientInfoDashboard({ searchTerm }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('/api/patients');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    

    fetchPatients();
  }, []);

  const removePatient = async (patientId) => {
    try {
      const response = await fetch(`/api/patients/${patientId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setPatients(patients.filter(patient => patient._id !== patientId));
    } catch (error) {
      console.error('Error removing patient:', error);
    }
  };
  

  return (
    <div className="patient-info-dashboard">
      <h2>Patient Information Dashboard</h2>
      <div className="patient-list">
        {patients.map(patient => (
          <div key={patient._id} className="patient">
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Injury:</strong> {patient.injury}</p>
            <p><strong>Pain Scale:</strong> {patient.painScale}</p>
            <button onClick={() => removePatient(patient._id)}>Mark as Attended</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientInfoDashboard;
