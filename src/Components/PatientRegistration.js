// Importing necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import './PatientRegistration.css';
import logo from './HospitalApplogo-removebg-preview.png';

// Defining the PatientRegistration component
function PatientRegistration() {
  // State variables for patient data, registration success, and registration error
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    address: '',
    injury: '',
    painScale: '',
  });

  // List of injuries
  const injuries = [
    "Fracture",
    "Laceration",
    "Burn",
    "Head Injury",
    "Sprain",
    "Dislocation",
    "Concussion",
    "Heart Attack",
    "Stroke",
    "Severe Bleeding",
    "Poisoning",
    "Allergic Reaction",
    "Asthma Attack",
    "Seizure",
    "Hypothermia",
    "Heat Stroke",
    "Dehydration",
    "Diabetic Emergency",
    "Pneumonia",
    "Appendicitis",
    "Hypertensive Crisis",
    "Anaphylaxis",
    "Sepsis",
    "Kidney Stones",
    "Gallstones",
    "Chest Pain (Unspecified)",
    "Abdominal Pain (Unspecified)",
    "Traumatic Injury",
    "Electrocution",
    "Drowning/Near Drowning",
    "Animal Bite",
    "Foreign Body Obstruction",
    "Pregnancy Complications",
    "Major Head Trauma",
    "Spinal Injury",
    "Respiratory Distress",
    "Psychiatric Emergency"
  ];

  const [registrationSuccess, setRegistrationSuccess] = useState(null);
  const [registrationError, setRegistrationError] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegistrationSuccess(null);
    setRegistrationError(null);

    try {
      // Parsing patient data and making a POST request to the server
      const patientData = {
        ...patient,
        age: parseInt(patient.age, 10),
        painScale: parseInt(patient.painScale, 10),
      };

      const response = await axios.post('/api/patients', patientData);
      setRegistrationSuccess(`Patient registered successfully. Your login is code: ${response.data.code}`);
      setPatient({ name: '', age: '', address: '', injury: '', painScale: '' });
    } catch (error) {
      console.error('Registration failed:', error);
      setRegistrationError('Registration failed. Please check your data and try again.');
    }
  };

  // Function to handle input changes
  const handleChange = (event) => {
    setPatient({ ...patient, [event.target.name]: event.target.value });
  };

  // Rendering the PatientRegistration component
  return (
    <div className="patient-registration-container">
      <div className="registration-header">
        <img src={logo} alt="Hospital Logo" className="registration-logo" />
        <h1 className="registration-title">Web ER</h1>
        <form onSubmit={handleSubmit}>
          {/* Input fields for patient information */}
          <input name="name" onChange={handleChange} placeholder="Name" required />
          <input name="age" onChange={handleChange} placeholder="Age" required />
          <input name="address" onChange={handleChange} placeholder="Address" required />

          {/* Dropdown for selecting injury */}
          <select name="injury" onChange={handleChange} value={patient.injury} required>
            <option value="">Select Injury</option>
            {injuries.map(injury => (
              <option key={injury} value={injury}>{injury}</option>
            ))}
          </select>

          <input name="painScale" onChange={handleChange} placeholder="Pain Scale (1-10)" required />
          <button type="submit">Register</button>
        </form>
        {/* Displaying registration success and error messages */}
        {registrationSuccess && <div className="registration-success">{registrationSuccess}</div>}
        {registrationError && <div className="registration-error">{registrationError}</div>}
      </div>
    </div>
  );
}

// Exporting the PatientRegistration component
export default PatientRegistration;
