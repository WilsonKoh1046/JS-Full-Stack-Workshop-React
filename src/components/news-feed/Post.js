import React from 'react';
import '../../styles/news-feed/Post.css';

export default function Post({detail}) {
    return (
        <div className="border border-dark container mt-4 pt-4 pb-4 pl-4 pr-4 post">
            <h3>{detail.name}</h3>
            <p>{detail.content}</p>
            <p>
                <span className="bg-dark border border-dark container text-white p-1">
                    {detail.tag}
                </span> 
            </p>   
        </div>
    );
}