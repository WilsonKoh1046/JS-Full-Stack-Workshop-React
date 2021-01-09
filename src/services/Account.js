import axios from 'axios';

export const signIn = async (data) => {
    data = cleanUpWhiteSpace(data);
    try {
        const response = await axios.post('/sign-in', data);
        return response;
    } catch(err) {
        console.log(err);
    }
}

export const signUp = async (data) => {
    data = cleanUpWhiteSpace(data);
    try {
        const response = await axios.post('/sign-up', data);
        return response;
    } catch(err) {
        console.log(err);
    }
}

export const signOut = () => {
    if (localStorage.getItem('account')) {
        localStorage.removeItem('account');
        return true;
    }
    return false;
}

const cleanUpWhiteSpace = (data) => {
    let output = {};
    for (let item of Object.keys(data)) {
        output[item] = data[item].trim();
    }
    return output;
}