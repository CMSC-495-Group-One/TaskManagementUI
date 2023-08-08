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

const RoleService = {
    getRoles: async () => {
        const response = await http.get('/roles');
        return response.data;
    },

    createRole: async (roleDto) => {
        const response = await http.post('/roles', roleDto);;
        return response.data;
    },

    getRoleById: async (id) => {
        const response = await http.get(`/roles/${id}`);;
        return response.data;
    },

    updateRoleById: async (id, roleDto) => {
        const response = await http.put(`/roles/${id}`, roleDto);
        return response.data;
    },

    deleteRoleById: async (id) => {
        const response = await http.delete(`/roles/${id}`);
        return response.data;
    },

};

export default RoleService;