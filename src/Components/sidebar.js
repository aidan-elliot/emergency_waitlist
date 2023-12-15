import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserNurse, faEnvelope, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from './HospitalApplogo-removebg-preview.png';
import './App.css';

function Sidebar({ onSearchChange }) {
  const [isOpen, setIsOpen] = useState(true); // State for sidebar open/close
  const [activeItem, setActiveItem] = useState(localStorage.getItem('activeItem') || 0); // State for active sidebar item
  const searchInputRef = useRef(null); // Reference to search input element

  // Handler for search input change
  const handleSearchInputChange = (event) => {
    onSearchChange(event.target.value);
  };

  // Handler for sidebar toggle
  const handleToggle = async () => {
    const newState = !isOpen;
    setIsOpen(newState);
    await fetch('/sidebar-state', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sidebarState: newState ? 'open' : 'closed' }),
    });
  };

  // Fetch sidebar state from server on component mount
  useEffect(() => {
    const fetchSidebarState = async () => {
      const response = await fetch('/sidebar-state');
      const text = await response.text();
      console.log(text);
      try {
        const data = JSON.parse(text);
        setIsOpen(data.sidebarState === 'open');
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
    };
    fetchSidebarState();
  }, []);

  // Handler for sidebar item click
  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  // Update active item in local storage on activeItem change
  useEffect(() => {
    localStorage.setItem('activeItem', activeItem);
  }, [activeItem]);

  // Handler for search icon click
  const handleSearchIconClick = () => {
    handleToggle();
    if (!isOpen) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 300);
    }
  };

  return (
    <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className={`sidebar-logo ${isOpen ? '' : 'hidden'}`} />
        <FontAwesomeIcon icon={faBars} className="sidebar-toggle" onClick={handleToggle} />
      </div>
      {isOpen && (
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchIconClick} />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search"
            onChange={handleSearchInputChange}
          />
        </div>
      )}
      <ul>
        {!isOpen && (
          <li className="sidebar-item" id='searchicon'>
            <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchIconClick} />
          </li>
        )}
        {['/dashboard', '/about', '/inbox'].map((route, index) => (
          <li key={route} className={`sidebar-item ${isOpen ? '' : 'collapsed'} ${activeItem == index ? 'active' : ''}`} onClick={() => handleItemClick(index)}>
            <FontAwesomeIcon icon={index === 0 ? faHouse : index === 1 ? faUserNurse : faEnvelope} />
            <Link to={route} className="sidebar-link">{index === 0 ? 'Home' : index === 1 ? 'About' : 'Inbox'}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;