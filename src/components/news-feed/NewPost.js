import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { createNewPost } from '../../services/Post';

export default function NewPost() {

    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();

    const submitNewPost = async (data) => {
        try {
            const response = await createNewPost(data);
            if (response.status === 201) {
                history.go(0);
            }
        } catch(err) {
            alert("This action cannot be done, please try again");
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit(submitNewPost)}>
            <div>
                <div className="row form-group">
                    <span className="mt-2 mb-2 mr-2">Subject: </span>
                    <input type="text" name="title" ref={register({ required: {value: true, message: "Must include post's subject"}})} />
                    <div className="mt-2 ml-2">
                        <label className="mr-2">Tag: </label>
                        <select name="tag" ref={register}>
                            <option>Canteen</option>
                            <option>Marketplace</option>
                            <option>Hostel</option>
                            <option>Fablab</option>
                            <option>Food</option>
                            <option>Freshmore</option>
                            <option>EPD</option>
                            <option>ESD</option>
                            <option>ISTD</option>
                            <option>ASD</option>
                        </select>
                    </div> 
                </div>
                <div className="row mt-1 mb-2">
                    {errors.title && errors.title.type === 'required' && (
                        <div className="error text-danger ml-3">{errors.title.message}</div>
                    )}
                </div>
                <div className="row form-group">
                    <textarea name="content" rows="3" cols="100" className="form-control" placeholder="What is on your mind ?" ref={register({ required: {value: true, message: "Cannot submit empty post"}})}/>
                    {errors.content && errors.content.type === 'required' && (
                        <div className="error text-danger ml-3">{errors.content.message}</div>
                    )}
                </div>
            </div>
            <div className="new-post-button">
                <input className="btn btn-secondary" name="submit" type="submit" ref={register} value="Post" />
            </div>
        </form>
    );
}