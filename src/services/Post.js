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

export const decideTagColor = (tag) => {
    let tagColor;
    switch(tag) {
        case 'Hostel':
            tagColor = 'bg-primary';
            break;
        case 'Marketplace':
            tagColor = 'bg-primary';
            break;
        case 'Canteen':
            tagColor = 'bg-warning';
            break;
        case 'Freshmore':
            tagColor = 'bg-success';
            break;
        case 'EPD':
            tagColor = 'bg-success';
            break;
        case 'ESD':
            tagColor = 'bg-success';
            break;
        case 'ISTD':
            tagColor = 'bg-success';
            break;
        case 'ASD':
            tagColor = 'bg-success';
            break;
        case 'Food':
            tagColor = 'bg-warning';
            break;
        default:
            tagColor = 'bg-dark';
            break;
    }
    return tagColor;
}