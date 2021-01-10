import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { signIn } from '../../services/Account';

export default function SignIn() {
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();

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

    return (
        <>
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
        </>
    );
}