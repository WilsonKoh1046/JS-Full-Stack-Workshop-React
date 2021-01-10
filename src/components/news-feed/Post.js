import React from 'react';
import '../../styles/news-feed/Post.css';
import { decideTagColor } from '../../services/Post';

export default function Post({detail}) {
    const tagColor = decideTagColor(detail.tag);
    return (
        <div className="border border-dark container bg-white mt-4 pt-4 pb-4 pl-4 pr-4 post">
            <h4>{detail.title}</h4>
            <p>
                <span className={`border border-dark container text-white pl-1 pr-1 ${tagColor}`}>
                    {detail.tag}
                </span> 
            </p>   
            <p>OP: {detail.name}</p>  
            <p>{detail.content}</p>
            <p>{detail.date}</p>
        </div>
    );
}