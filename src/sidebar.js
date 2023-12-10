import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserNurse, faEnvelope, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from './HospitalApplogo-removebg-preview.png'

function Sidebar(props) {

  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(localStorage.getItem('activeItem') || 0);

  const handleToggle = () => {
    // Toggle the navbar
    setIsOpen(!isOpen);
    props.onToggle();
  };

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  useEffect(() => {
    localStorage.setItem('activeItem', activeItem);
  }, [activeItem]);

  return (
    <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className={`sidebar-logo ${isOpen ? '' : 'hidden'}`} />
        <FontAwesomeIcon icon={faBars} className="sidebar-toggle" onClick={handleToggle} />
      </div>
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input type="text" placeholder="Search" />
      </div>
      <ul>
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