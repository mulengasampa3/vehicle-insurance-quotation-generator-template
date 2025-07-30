// src/api/authApi.ts
import axios from 'axios';
import axiosInstance from './axiosConfig';

interface ApiResponse {
  status: number;
  data: any; // Adjust the `data` type based on what your API returns.
}

const API_URL = 'http://localhost:8080/api/auth';

export const registerUser = async (data: { email: string; password: string; username: string }) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/register`, data);
      if (response.status == 200) {
        console.log("qwerty")
        return response;
      }
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };
  
export const requestPasswordReset = async (email: string) => {
    console.log(email)
    try {
    const response = await axiosInstance.post(`${API_URL}/request-password-reset`, { email });
    console.log(response)
    return response.data;
} catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }

}

export const verifyAccount = async(data:{email: string, token: string}) => {
  console.log("verifyAccount called")
  try {
      const response = await axiosInstance.post(`${API_URL}/verify-account`, data);

      console.log(response)
      return response;
  } catch (error) {
      console.error("Error during Verification:", error);
      throw error;
    }

}

export const verifyResetToken = async(email: string, token: string) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/verify-reset-token`, { params: { email, token } });

        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Error during Verification:", error);
        throw error;
      }

}

export const resetPassword = async(data: { email: string; token: string; newPassword: string }) => {
    try {
        const response = await   axiosInstance.put(`${API_URL}/reset-password`, data);
        return response.data;
    } catch (error) {
        console.error("Error during reset password:", error);
        throw error;
      }

}

export const refreshAccessToken = async (refreshToken: string) => {
    const response = await axiosInstance.post(`${API_URL}/refresh-token`, { refreshToken });
    return response.data; // { accessToken }
};

