import React from 'react';
import TopBar from './topbar';
import './App.css'; // Import your CSS

function Dashboard() {
  return (
    <div>
    <TopBar />
    <div className="dashboard">
      <div className="dashboard-item">
        {/* Add your content here */}
      </div>
      <div className="dashboard-item">
        {/* Add your content here */}
      </div>
      <div className="dashboard-item">
        {/* Add your content here */}
      </div>
      <div className="dashboard-item">
        {/* Add your content here */}
      </div>
      {/* Add more boxes as needed */}
    </div>
  </div>

  );
}

export default Dashboard;