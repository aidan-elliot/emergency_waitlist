import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserNurse, faEnvelope, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from './HospitalApplogo-removebg-preview.png';


function Sidebar() {

  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(localStorage.getItem('activeItem') || 0);
  const searchInputRef = useRef(null);

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

  useEffect(() => {
    const fetchSidebarState = async () => {
      const response = await fetch('/sidebar-state');
      const text = await response.text(); // Get the response as text
      console.log(text); // Log the response to the console
      try {
        const data = JSON.parse(text); // Try to parse the response as JSON
        setIsOpen(data.sidebarState === 'open');
      } catch (error) {
        console.error('Failed to parse JSON:', error); // Log any JSON parsing errors to the console
      }
    };
    fetchSidebarState();
  }, []);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  useEffect(() => {
    localStorage.setItem('activeItem', activeItem);
  }, [activeItem]);

  const handleSearchIconClick = () => {
    handleToggle();
    if (!isOpen) {
      setTimeout(() => {
        if (searchInputRef.current) { // Check if the ref is defined
          searchInputRef.current.focus(); // Focus on the search input
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
          <input ref={searchInputRef} type="text" placeholder="Search" /> {/* Attach the ref to the input */}
        </div>
      )}
      <ul>
        {!isOpen && (
          <li className="sidebar-item" id='searchicon'>
            <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchIconClick} />
          </li>
        )}
        {['/', '/about', '/contact'].map((route, index) => (
          <li key={route} className={`sidebar-item ${isOpen ? '' : 'collapsed'} ${activeItem == index ? 'active' : ''}`} onClick={() => handleItemClick(index)}>
            <FontAwesomeIcon icon={index === 0 ? faHouse : index === 1 ? faUserNurse : faEnvelope} />
            <Link to={route} className="sidebar-link">{index === 0 ? 'Home' : index === 1 ? 'About' : 'Contact'}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;