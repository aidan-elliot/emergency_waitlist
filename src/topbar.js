import React from 'react';
import './App.css';

function TopBar() {
  return (
    <div className="top-bar">
      <h1>Dashboard</h1>
      <input type="search" placeholder="Search..." />
    </div>
  );
}

export default TopBar;