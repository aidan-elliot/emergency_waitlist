import React, { useState } from 'react';
import axios from 'axios';

function PatientRegistration() {
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    address: '',
    injury: '',
    painScale: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/register', patient);
      console.log(response.data);
      alert(`Patient registered successfully. Your code: ${response.data.code}`);
    } catch (error) {
      console.error('Registration failed:', error);
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
      <input name="injury" onChange={handleChange} placeholder="Injury" required />
      <input name="painScale" onChange={handleChange} placeholder="Pain Scale (1-10)" required />
      <button type="submit">Register</button>
    </form>
  );
}

export default PatientRegistration;
