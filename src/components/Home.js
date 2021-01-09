import React, { useState, useEffect } from 'react';
import Post from './news-feed/Post';
import { useHistory } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { useForm } from 'react-hook-form';
import '../styles/Home.css';
import { 
    getAllPosts, 
    createNewPost, 
    getTags, 
    decideTagColor 
} from '../services/Post';

export default function Home() {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ posts, setPosts ] = useState([]);
    const [ postsCopy, setPostsCopy ] = useState([]);
    const [ tags, setTags ] = useState({});
    const [activePage, setActivePage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(3);
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllPosts();
                const data = response.data.reverse(); // start from most recent
                setPosts(data);
                setPostsCopy(data);
                setTags(getTags(data));
            } catch(err) {}
        })();
        if (localStorage.getItem('account')) {
            setLoggedIn(true);
        }
    }, []);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    }

    const submitNewPost = async (data) => {
        try {
            const response = await createNewPost(data);
            history.go(0);
        } catch(err) {
            alert("This action cannot be done, please try again");
            console.log(err);
        }
    }

    let end = itemPerPage * activePage;
    let start = end - (itemPerPage - 1);
    let allPosts = [];
    if (end > posts.length) {
        end = (end- itemPerPage) + (itemPerPage - (end - posts.length));
    }
    for (let i = start - 1; i < end; i++) {
        allPosts.push(posts[i]);
    }

    return (
        <div className="container mt-4 mb-4">
            <div className="container new-post">
                { loggedIn ? 
                    <form onSubmit={handleSubmit(submitNewPost)}>
                        <div>
                            <div className="row form-group">
                                <span className="mr-2">Subject: </span>
                                <input type="text" name="title" ref={register({ required: {value: true, message: "Must include post's subject"}})} />
                                <div className="ml-4">
                                    <label className="mr-2">Tag: </label>
                                    <select name="tag" ref={register}>
                                        <option>Hostel</option>
                                        <option>Marketplace</option>
                                        <option>Canteen</option>
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
                    :
                    <p>Sign In To Create New Post !</p>
                }
            </div>
            { posts.length > 0 && 
                <div>
                    <div className="tags mt-2">
                        <span 
                            className="mr-2 mt-2 p-1 text-white bg-dark border border-dark" style={{cursor: "pointer"}} 
                            onClick={() => history.go(0) }
                        >
                            {/* we use the length of the copy of the array of posts so it won't be affected when switching to different tag */}
                            All ({postsCopy.length})
                        </span>
                        { Object.keys(tags).map((item, key) => {
                            return <span 
                                        key={key} 
                                        className={`mr-2 mt-2 pt-1 pb-1 pl-2 pr-2 border border-dark text-white ${decideTagColor(item)}`} 
                                        style={{cursor: "pointer"}}
                                        onClick={() => {
                                            setPosts(tags[item]);
                                            setActivePage(1); // must go back to first page as different tag has different amount of item
                                        }}
                                    >
                                        {item} ({tags[item].length})
                                    </span>
                        }) }
                    </div>
                    <div className="pagination-button mt-4">
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={itemPerPage}
                            totalItemsCount={posts.length}
                            pageRangeDisplayed={5}
                            linkClass="page-link"
                            onChange={handlePageChange}     
                        />
                    </div>
                </div>
            }
            { allPosts.map((item, key) => {
                return <Post  key={key} detail={item} />
            }) }
        </div>
    );
}