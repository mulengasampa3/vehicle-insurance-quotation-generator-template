import { refreshAccessToken } from "./authApi";
import axiosInstance from "./axiosConfig";


const refreshTokens = async (refreshToken: string) => {
    try {
      const { accessToken } = await refreshAccessToken(refreshToken);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      return accessToken;
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export default refreshTokens;