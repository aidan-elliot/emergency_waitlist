import React from 'react';
import TopBar from './TopBar';
import Sidebar from './sidebar';
import PatientInfoDashboard from './PatientInfoDashboard'; // Import the new component

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main-content">
        <TopBar /> {/* TopBar component */}
        <PatientInfoDashboard /> {/* Patient info dashboard component */}
      </div>
    </div>
  );
}

export default Dashboard;
