import React, { useState, useEffect } from 'react';
import Post from './news-feed/Post';
import Pagination from 'react-js-pagination';
import { useForm } from 'react-hook-form';
import '../styles/Home.css';
import { getAllPosts, getTags, decideTagColor } from '../services/Post';

export default function Home() {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ posts, setPosts ] = useState([]);
    const [ tags, setTags ] = useState({});
    const [activePage, setActivePage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(3);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllPosts();
                const data = response.data.reverse(); // start from most recent
                setPosts(data);
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
                        <textarea rows="3" cols="100" className="form-control" placeholder="What is on your mind ?"/>
                    </div>
                    :
                    <p>Sign In To Create New Post !</p>
                }
            </div>
            { posts.length > 0 && 
                <div>
                    <div className="tags mt-2">
                        <span className="mr-3 mt-2 p-1 text-white bg-dark border border-dark">All ({posts.length})</span>
                        { Object.keys(tags).map((item, key) => {
                            return <span key={key} className={`mr-3 mt-2 pt-1 pb-1 pl-2 pr-2 border border-dark text-white ${decideTagColor(item)}`}>{item} ({tags[item].length})</span>
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