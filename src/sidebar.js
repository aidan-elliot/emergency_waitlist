import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserNurse, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import logo from './HospitalApplogo.png'

function Sidebar(props) {

    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        // Toggle the navbar
        setIsOpen(!isOpen);
        props.onToggle();
    };

    return (
        <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className={`sidebar-logo ${isOpen ? '' : 'hidden'}`} />
          <FontAwesomeIcon icon={faBars} className="sidebar-toggle" onClick={handleToggle} />
        </div>
        <ul>
          <li className={`sidebar-item ${isOpen ? '' : 'collapsed'}`}>
            <FontAwesomeIcon icon={faHouse} />
            <Link to="/" className="sidebar-link">Home</Link>
          </li>
          <li className={`sidebar-item ${isOpen ? '' : 'collapsed'}`}>
            <FontAwesomeIcon icon={faUserNurse} />
            <Link to="/about" className="sidebar-link">About</Link>
          </li>
          <li className={`sidebar-item ${isOpen ? '' : 'collapsed'}`}>
            <FontAwesomeIcon icon={faEnvelope} />
            <Link to="/contact" className="sidebar-link">Contact</Link>
          </li>
        </ul>
      </nav>
    );
}

export default Sidebar;