import React, { useState } from 'react';
import axios from 'axios';

function PatientRegistration() {
  const [patient, setPatient] = useState({ name: '', age: '', address: '', injury: '', painScale: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/patients', patient);
      alert('Patient registered successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setPatient({ ...patient, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={patient.name} onChange={handleChange} placeholder="Name" required />
      <input name="age" value={patient.age} onChange={handleChange} placeholder="Age" required />
      <input name="address" value={patient.address} onChange={handleChange} placeholder="Address" required />
      <input name="injury" value={patient.injury} onChange={handleChange} placeholder="Injury" required />
      <input name="painScale" value={patient.painScale} onChange={handleChange} placeholder="Pain Scale (1-10)" required />
      <button type="submit">Register</button>
    </form>
  );
}

export default PatientRegistration;