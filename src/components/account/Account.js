import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { signIn, signUp, signOut } from '../../services/Account';
import '../../styles/account/Account.css';

export default function Account() {
    let emptyUserInfo = {
        'name': '',
        'email': ''
    };

    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userInfo, setUserInfo ] = useState(emptyUserInfo);
    const [ createNewAccount, setCreateNewAccount ] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const { register: registerSignUp, handleSubmit: handleSubmitSignUp, errors: errorsSignUp } = useForm();
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

    const userSignIn = async (data) => {
        try {
            const response = await signIn(data);
            localStorage.setItem('account', JSON.stringify(response.data));
            history.push('/');
        } catch(err) {
            alert("Sign in failed, please try again");
            console.log(err);
        } finally {
            history.go(0);
        }
    }

    const userSignUp = async (data) => {
        try {
            const response = await signUp(data);
            history.go(0);
            setCreateNewAccount(false);
        } catch(err) {
            alert("Sign up failed, please try again");
            console.log(err);
        }
    }

    const userSignOut = () => {
        if (signOut()) {
            history.go(0);
        }
    }

    return (
        <div className="container">
            { loggedIn ?
                <div className="mt-3">
                    <div className="user-profile">
                        <div className="user-detail">
                            <p>Name: {userInfo.name}</p>
                            <p>Email: {userInfo.email}</p>
                        </div>
                    </div>
                    <button className="btn btn-danger" onClick={userSignOut}>Sign Out</button>  
                </div>
            :
            <div>
                { createNewAccount ? 
                    <div className="container">
                        <form className="mt-3" onSubmit={handleSubmitSignUp(userSignUp)}>
                            <div className="form-group">
                                <label>Name: </label>
                                <br/>
                                <input type="text" name="name" ref={registerSignUp({required: { value: true, message: "Must input name" }})} />
                                {errorsSignUp.name && errorsSignUp.name.type === "required" && (
                                    <div className="error text-danger">{errorsSignUp.name.message}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Password: </label>
                                <br/>
                                <input type="password" name="password" ref={registerSignUp({ required: { value: true, message: "Must input password" }, minLength: {value: 8, message: "Password must has a length of minimum 8"}})} />
                                {errorsSignUp.password && errorsSignUp.password.type === "required" && (
                                    <div className="error text-danger">{errorsSignUp.password.message}</div>
                                )}
                                {errorsSignUp.password && errorsSignUp.password.type === "minLength" && (
                                    <div className="error text-danger">{errorsSignUp.password.message}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Email: </label>
                                <br/>
                                <input type="text" name="email" ref={registerSignUp({required: { value: true, message: "Must input email" }})} />
                                {errorsSignUp.email && errorsSignUp.email.type === "required" && (
                                    <div className="error text-danger">{errorsSignUp.email.message}</div>
                                )}
                            </div>
                            <input className="btn btn-primary" type="submit" ref={registerSignUp} value="Sign Up" />
                        </form>
                        <p className="mt-3">
                            Have an account ? 
                            <span style={{cursor: "pointer"}} className="ml-1 text-primary" onClick={() => setCreateNewAccount(false)}>Sign in</span>
                        </p>
                    </div>
                    :
                    <div className="container">
                        <form className="mt-3" onSubmit={handleSubmit(userSignIn)}>
                            <div className="form-group">
                                <label>Name: </label>
                                <br/>
                                <input type="text" name="name" ref={register({required: { value: true, message: "Must input name" }})} />
                                {errors.name && errors.name.type === "required" && (
                                    <div className="error text-danger">{errors.name.message}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Password: </label>
                                <br/>
                                <input type="password" name="password" ref={register({required: { value: true, message: "Must input password" }})} />
                                {errors.password && errors.password.type === "required" && (
                                    <div className="error text-danger">{errors.password.message}</div>
                                )}
                            </div>
                            <input className="btn btn-primary" type="submit" ref={register} value="Sign In" />
                        </form>
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