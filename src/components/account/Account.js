import React, { useState, useEffect } from 'react';
import UserInfo from './UserInfo';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Account() {
    let emptyUserInfo = {
        'name': '',
        'email': ''
    };

    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userInfo, setUserInfo ] = useState(emptyUserInfo);
    const [ createNewAccount, setCreateNewAccount ] = useState(false);

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
                <UserInfo detail={userInfo} />
                :
                <div>
                    { createNewAccount ? 
                        <div className="container">
                            <SignUp />
                            <p className="mt-3">
                                Have an account ? 
                                <span style={{cursor: "pointer"}} className="ml-1 text-primary" onClick={() => setCreateNewAccount(false)}>Sign in</span>
                            </p>
                        </div>
                        :
                        <div className="container">
                            <SignIn />
                            <p className="mt-3">
                                Don't have an account yet ? 
                                <span style={{cursor: "pointer"}} className="ml-1 text-primary" onClick={() => setCreateNewAccount(true)}>Sign up</span>
                            </p>
                        </div>
                    }
                </div>
            }
        </div>
    );
}