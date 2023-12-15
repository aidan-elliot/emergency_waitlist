import React, { useState } from 'react';
import axios from 'axios';

const injurySeverityScores = {
  "Fracture": 5,
  "Laceration": 3,
  "Burn": 4,
  "Sprain": 2,
  "Concussion": 4, 
  "Allergic Reaction": 3,
  "Chest Pain": 5,
  "Abdominal Pain": 5,
  "Headache": 2,
  "Shortness of Breath": 5,
  "Poisoning": 5,

};

function PatientRegistration() {
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    address: '',
    injury: '',
    painScale: '',
  });

  const injuries = [
    "Fracture",
    "Laceration",
    "Burn",
    "Sprain",
    "Concussion",
    "Allergic Reaction",
    "Chest Pain",
    "Abdominal Pain",
    "Headache",
    "Shortness of Breath",
    "Poisoning",
    // Add more injuries as required
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const patientData = {
        ...patient,
        age: parseInt(patient.age),
        painScale: parseInt(patient.painScale),
      };

      const response = await axios.post('/api/patients', patientData);
      console.log(response.data);
      alert(`Patient registered successfully. Your code: ${response.data.code}`);

      setPatient({ name: '', age: '', address: '', injury: '', painScale: '' });
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please check your data and try again.');
    }
  };

  const handleChange = (event) => {
    setPatient({ ...patient, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Name" required />
      <input name="age" onChange={handleChange} placeholder="Age" required />
      <input name="address" onChange={handleChange} placeholder="Address" required />
      
      <select name="injury" onChange={handleChange} value={patient.injury} required>
        <option value="">Select Injury</option>
        {injuries.map(injury => (
          <option key={injury} value={injury}>{injury}</option>
        ))}
      </select>

      <input name="painScale" onChange={handleChange} placeholder="Pain Scale (1-10)" required />
      <button type="submit">Register</button>
    </form>
  );
}

export default PatientRegistration;
