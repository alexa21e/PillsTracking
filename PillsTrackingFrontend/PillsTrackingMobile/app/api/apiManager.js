import axios from 'axios';

const apiManager = axios.create({
    baseURL: 'https://localhost:7137/api/',
    responseType: 'json',
})

export default apiManager;