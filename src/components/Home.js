import React, { useState, useEffect } from 'react';
import Post from './news-feed/Post';
import Pagination from 'react-js-pagination';
import '../styles/Home.css';

export default function Home() {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(6);

    useEffect(() => {
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
        <div className="container mt-4">
            <div className="container">
                { loggedIn ? 
                    <div className="row">
                        <label for="newPostArea" className="mr-3 form-label">New Post</label>
                        <textarea rows="3" cols="100" id="newPostArea" className="form-control" placeholder="What is on your mind ?"/>
                    </div>
                    :
                    <p>Sign In To Create New Post !</p>
                }
            </div>
            <div className="pagination-button mt-4">
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemPerPage}
                    totalItemsCount={posts.length}
                    pageRangeDisplayed={2}
                    linkClass="page-link"
                    onChange={handlePageChange}     
                />
            </div>
            { allPosts.map((detail, key) => {
                return <Post  key={key} detail={detail} />
            }) }
        </div>
    );
}