import axios from 'axios';

const http = axios.create({
    baseURL: 'https://task-management-api-test-5ef9ebfe6fb3.herokuapp.com/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default http;