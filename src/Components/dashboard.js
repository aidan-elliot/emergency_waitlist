import React, { useState } from 'react';
import TopBar from './TopBar';
import Sidebar from './sidebar';
import PatientInfoDashboard from './PatientInfoDashboard';

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');

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

export default Dashboard;
