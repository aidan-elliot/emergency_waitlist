// Importing necessary modules
import React, { useState } from 'react';
import TopBar from './TopBar';
import Sidebar from './sidebar';
import PatientInfoDashboard from './PatientInfoDashboard';

// Defining the Dashboard component
function Dashboard() {
  // Setting up state for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Rendering the dashboard layout
  return (
    <div className="dashboard-layout">
      <Sidebar onSearchChange={setSearchTerm} />
      <div className="dashboard-main-content">
        <TopBar />
        <PatientInfoDashboard searchTerm={searchTerm} />
      </div>
    </div>
  );
}

// Exporting the Dashboard component
export default Dashboard;
