import api from './api';

export const loginUser = async (email, password) => {
  return await api.post('/auth/login', { email, password });
};

export const registerUser = async (username, email, password, role) => {
  return await api.post('/auth/register', { username, email, password, role });
};

export const logoutUser = async () => {
    try {
        await api.post('/auth/logout');
    } catch(e) {
        console.error(e);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

