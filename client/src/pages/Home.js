import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import './Home.css';

function Home() {
    return (
        <div className="app">
            <header className="app-header">
                <img src={logo} className="app-logo" alt="logo" />
                Easily create simple flashcards
                <Link to="/create" className="btn" style={{marginTop: 10}}>
                Get started
                </Link>
            </header>
        </div>
    )
}

export default Home;