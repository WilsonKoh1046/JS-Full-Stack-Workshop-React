import React from 'react';
import { signOut } from '../../services/Account';
import { useHistory } from 'react-router-dom';
import '../../styles/account/Account.css';

export default function UserInfo({ detail }) {

    const history = useHistory();

    const userSignOut = () => {
        if (signOut()) {
            history.go(0);
        }
    }

    return (
        <div className="mt-3">
            <div className="user-profile">
                <div className="user-detail">
                    <p>Name: {detail.name}</p>
                    <p>Email: {detail.email}</p>
                </div>
            </div>
            <button className="btn btn-danger" onClick={userSignOut}>Sign Out</button>  
        </div>
    );
}