import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import './Navbar.css'

function Navbar(props) {
    return (
        <div className="navbar">
            <Link to="/" className="nav-logo-container">
                <img src={logo} className="nav-logo"/>
            </Link>
            <div className="nav-content">
                {props.children}
            </div>
        </div>
    );
}

export default Navbar;