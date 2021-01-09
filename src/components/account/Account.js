import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

export default function Account() {
    let emptyUserInfo = {
        'name': '',
        'email': ''
    };

    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userInfo, setUserInfo ] = useState(emptyUserInfo);
    const [ editProfile, setEditProfile ] = useState(false);
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('account')) {
            setLoggedIn(true);
            let user = JSON.parse(localStorage.getItem('account'));
            setUserInfo(
                {
                    'name': user.name,
                    'email': user.email
                }
            );
        }
    }, []);

    return (
        <div className="container">
            { loggedIn ?
                <div>
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                </div>
            :
            <p>Please Log In</p>
            }
        </div>
    );
}