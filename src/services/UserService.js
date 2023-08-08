import http from './HttpService'

// request interceptor to include the accessToken in every request header
http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers[`Authorization`] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



const UserService = {
    getUsers: async () => {
        const response = await http.get('/users');
        return response.data;
    },

    getUserById: async (id) => {
        const response = await http.get(`/users/${id}`);;
        return response.data;
    },

    updateUserById: async (id, userDto) => {
        const response = await http.put(`/users/${id}`, userDto);
        return response.data;
    },

    deleteUserById: async (id) => {
        const response = await http.delete(`/users/${id}`);
        return response.data;
    },

    getUserTasks: async (id) => {
        const response = await http.get(`/users/${id}/tasks`);
        return response.data;
    },

    getUserRoles: async (id) => {
        const response = await http.get(`/users/${id}/roles`);
        return response.data;
    },

};

export default UserService;