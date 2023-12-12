import React, { useState, useEffect } from 'react';

function PatientInfoDashboard() {
  // Sample patient data
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', issue: 'Headache', waitTime: '15 mins' },
    { id: 2, name: 'Jane Smith', issue: 'Sprained Ankle', waitTime: '30 mins' },
    // Add more sample patients here
  ]);

  const removePatient = (patientId) => {
    setPatients(patients.filter(patient => patient.id !== patientId));
  };

  // Calculate estimated total wait time
  const totalWaitTime = '45 mins'; // Placeholder, calculate based on your logic

  return (
    <div className="patient-info-dashboard">
      <h2>Patient Information Dashboard</h2>
      <div className="patient-list">
        {patients.map(patient => (
          <div key={patient.id} className="patient">
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Issue:</strong> {patient.issue}</p>
            <p><strong>Estimated Wait:</strong> {patient.waitTime}</p>
            <button onClick={() => removePatient(patient.id)}>Mark as Attended</button>
          </div>
        ))}
      </div>
      <p><strong>Estimated Total Wait Time for End of List:</strong> {totalWaitTime}</p>
    </div>
  );
}

export default PatientInfoDashboard;
