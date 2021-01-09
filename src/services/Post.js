import axios from 'axios';

export const getAllPosts = async () => {
    try {
        const response = await axios.get('/posts');
        return response;
    } catch(err) {
        console.log(err);
    }
}

export const getTags = (posts) => {
    let output = {};
    for (let post of posts) {
        if (!output[post.tag]) {
            output[post.tag] = [];
        } 
        output[post.tag].push(post);
    }
    return output;
}