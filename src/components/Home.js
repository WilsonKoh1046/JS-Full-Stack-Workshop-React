import React, { useState, useEffect } from 'react';
import Post from './news-feed/Post';
import Pagination from 'react-js-pagination';
import '../styles/Home.css';
import { getAllPosts, getTags } from '../services/Post';

export default function Home() {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ posts, setPosts ] = useState([]);
    const [ tags, setTags ] = useState({});
    const [activePage, setActivePage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(3);

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllPosts();
                setPosts(response.data);
                setTags(getTags(response.data));
            } catch(err) {}
        })();
        if (localStorage.getItem('account')) {
            setLoggedIn(true);
        }
    }, []);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
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
                    <div className="row">
                        <label for="newPostArea" className="mr-3 form-label">New Post</label>
                        <textarea rows="3" cols="100" id="newPostArea" className="form-control" placeholder="What is on your mind ?"/>
                    </div>
                    :
                    <p>Sign In To Create New Post !</p>
                }
            </div>
            { posts.length > 0 && 
                <div>
                    <div className="tags mt-4">
                        <span className="mr-3 p-1 text-white bg-secondary">All ({posts.length})</span>
                        { Object.keys(tags).map((item, key) => {
                            return <span key={key} className="mr-3 p-1 text-white bg-secondary">{item} ({tags[item].length})</span>
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