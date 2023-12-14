import React from 'react';
import TopBar from './TopBar';
import Sidebar from './sidebar';
import PatientInfoDashboard from './PatientInfoDashboard';

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main-content">
        <TopBar />
        <PatientInfoDashboard />
      </div>
    </div>
  );
}

export default Dashboard;
