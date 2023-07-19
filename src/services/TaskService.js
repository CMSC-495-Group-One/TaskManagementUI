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

const TaskService = {
    getTasks: async () => {
        const response = await http.get('/tasks'); 
        return response.data;
    },
    
};

export default new TaskService();