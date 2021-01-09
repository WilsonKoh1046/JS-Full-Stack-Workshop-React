import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

export default function NavBar() {
    const history = useHistory();
    const location = useLocation();
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light bg-dark">
                <div className="container">
                    <Link to='/' onClick={() => { if (location.pathname === '/') history.go(0) } } className="navbar-brand text-white">
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