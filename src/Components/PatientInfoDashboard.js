// Importing necessary dependencies
import React, { useState, useEffect } from 'react';
import './PatientInfoDashboard.css';

// Defining the PatientInfoDashboard component
function PatientInfoDashboard({ searchTerm }) {
  const [patients, setPatients] = useState([]);

  // Function to fetch patient data from the server
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

  // Fetching patients on component mount and setting up interval to fetch patients every 10 seconds
  useEffect(() => {
    fetchPatients();
    const intervalId = setInterval(fetchPatients, 10000);

    // Cleaning up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Filtering and sorting patients based on search term and priority score
  const filteredAndSortedPatients = searchTerm
    ? patients
        .filter(patient =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (patient.age && patient.age.toString().includes(searchTerm)) ||
          patient.injury.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (patient.painScale && patient.painScale.toString().includes(searchTerm))
        )
        .sort((a, b) => b.priorityScore - a.priorityScore)
    : patients.sort((a, b) => b.priorityScore - a.priorityScore);

  // Function to remove a patient from the list
  const removePatient = async (patientId) => {
    try {
      const response = await fetch(`/api/patients/${patientId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchPatients();
    } catch (error) {
      console.error('Error removing patient:', error);
    }
  };

  // Rendering the PatientInfoDashboard component
  return (
    <div className="patient-info-dashboard">
      <h2>Patient Information Dashboard</h2>
      <div className="patient-list">
        {filteredAndSortedPatients.map(patient => (
          <div key={patient._id} className="patient">
            <p><strong>Priority Score:</strong> {patient.priorityScore}</p>
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

// Exporting the PatientInfoDashboard component
export default PatientInfoDashboard;
