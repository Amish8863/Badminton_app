import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Change if using env vars later
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
