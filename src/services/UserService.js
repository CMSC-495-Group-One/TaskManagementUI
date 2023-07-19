import http from './HttpService'

// request interceptor to include the accessToken in every request header
http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if(token) {
            config.headers['Authorization'] = 'Bearer ${token}';
        } 
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// do we need to pull any of the user info out of the token here?
// like sub, email, or userId?

const UserService = {
    getUsers: async () => {
        const response = await http.get('/users'); //user route?
        return response.data;
    },
    

};

export default new UserService();