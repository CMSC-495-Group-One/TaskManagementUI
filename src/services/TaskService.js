import http from './HttpService'

// request interceptor to include the accessToken in every request header
http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if(token) {
            config.headers[`Authorization`] = `Bearer ${token}`;
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
    
    createTask: async (taskDto) => {
        const response = await http.post('/tasks', taskDto);; 
        return response.data;
    },

    getTasksById: async (id) => {
        const response = await http.get(`/tasks/${id}`);; 
        return response.data;
    },

    updateTaskById: async (id, taskDto) => {
        const response = await http.put(`/tasks/${id}`, taskDto);
        return response.data;
    },

    deleteTaskById: async (id) => {
        const response = await http.delete(`/tasks/${id}`);
        return response.data;
    },
   
};

export default TaskService;