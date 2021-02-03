import axios from 'axios';

const instance = axios.create({
    baseURL:'https://tiktok-backend-aiyuuu.herokuapp.com'
});

export default instance;