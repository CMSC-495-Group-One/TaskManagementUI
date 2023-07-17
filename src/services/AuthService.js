import http from './HttpService'

class AuthService {
    async signIn(body) {
        const { data } = await http.post('/auth/signin', body);
        if (data?.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
        }
        return data;
    }
}

export default new AuthService();