import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light bg-dark">
                <div className="container">
                    <Link to='/' className="navbar-brand text-white">
                        SUTDBOOK
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to='/' className="nav-link text-white">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/account' className="nav-link text-white">Account</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>    
    );
}