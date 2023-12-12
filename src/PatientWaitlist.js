import React from 'react';
import './App.css';

function PatientWaitlist({ waitlistPosition }) {
  return (
    <div className="patient-waitlist">
      <p>Your position in the waitlist: {waitlistPosition}</p>
    </div>
  );
}

export default PatientWaitlist;
