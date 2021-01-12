import axios from 'axios';

export const getAllPosts = async () => {
    try {
        const response = await axios.get('/posts');
        return response;
    } catch(err) {
        console.log(err);
    }
}

export const createNewPost = async (data) => {
    attachUsername(data);
    addCreateDate(data);
    try {
        const response = await axios.post('/posts', data);
        return response;
    } catch(err) {
        console.log(err);
    }
}

const attachUsername = (data) => {
    data.name = JSON.parse(localStorage.getItem('account')).name;
}

const addCreateDate = (data) => {
    data.date = new Date().toLocaleString();
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
        case 'Fablab':
            tagColor = 'bg-primary';
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
        case 'PhD/Master':
            tagColor = 'bg-success';
            break;
        case 'General':
            tagColor = 'bg-primary';
            break;
        case 'Fifth-Row':
            tagColor = 'bg-success';
            break;
        case 'Food':
            tagColor = 'bg-warning';
            break;
    }
    return tagColor;
}