import axios from 'axios';
import refreshTokens from './tokenRefresh';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const accessToken = await refreshTokens(refreshToken);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;