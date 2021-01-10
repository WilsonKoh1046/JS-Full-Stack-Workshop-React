import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../services/Account';

export default function SignUp() {
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();

    const userSignUp = async (data) => {
        try {
            const response = await signUp(data);
            if (response.status === 201) {
                alert('Successfully created account!');
                history.go(0);
            } 
        } catch(err) {
            alert("Sign up failed, please try again");
            console.log(err);
        }
    }

    return (
        <>
            <form className="mt-3" onSubmit={handleSubmit(userSignUp)}>
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
                    <input type="password" name="password" ref={register({ required: { value: true, message: "Must input password" }, minLength: {value: 8, message: "Password must has a length of minimum 8"}})} />
                    {errors.password && errors.password.type === "required" && (
                        <div className="error text-danger">{errors.password.message}</div>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                        <div className="error text-danger">{errors.password.message}</div>
                    )}
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <br/>
                    <input type="text" name="email" ref={register({required: { value: true, message: "Must input email" }})} />
                    {errors.email && errors.email.type === "required" && (
                        <div className="error text-danger">{errors.email.message}</div>
                    )}
                </div>
                <input className="btn btn-primary" type="submit" ref={register} value="Sign Up" />
            </form>
        </>
    );
}