import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    // Globally unwrap backend's { success: true, data: ... } pattern
    const resData = response.data;
    if (resData && typeof resData === 'object' && resData.success === true && 'data' in resData) {
      return resData.data;
    }
    return resData;
  },
  (error) => {
    // Check if unauthorized and clear storage locally
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect handled at component level or force window.location.href = '/login'
    }
    // Return custom or server message
    const msg = error.response?.data?.message || 'An error occurred';
    return Promise.reject(new Error(msg));
  }
);

export default api;

