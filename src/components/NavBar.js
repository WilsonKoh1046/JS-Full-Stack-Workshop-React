import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

export default function NavBar() {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ username, setUsername ] = useState('');
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('account')) {
            setLoggedIn(true);
            setUsername(JSON.parse(localStorage.getItem('account')).name);
        }
    }, []);
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container">
                    <Link to='/' onClick={() => { if (location.pathname === '/') history.go(0) } } className="navbar-brand text-white">
                        SUTDBOOK
                    </Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to='/' className="nav-link text-white">Home</Link>
                        </li>
                        { loggedIn ?
                            <li className="nav-item">
                                <Link to='/account' className="nav-link text-white"><i className="fa far">&#xf007;</i> {username}</Link>
                            </li>
                            :
                            <li className="nav-item">
                                <Link to='/account' className="nav-link text-white"><i className="fa far">&#xf007;</i> Account</Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </>    
    );
}