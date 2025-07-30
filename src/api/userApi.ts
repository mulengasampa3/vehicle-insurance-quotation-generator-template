import axios from 'axios';
import axiosInstance from './axiosConfig';

// Configure the base URL for the backend API
const API_URL = 'http://localhost:8080/api/users';

// Function to set the Authorization header for authenticated requests
export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const authApi = {
  // Register a new user without storing a token
  registerUser: async (user: { email: string; password: string; roles: string[] }) => {
    // Ensure no Authorization header is sent with the register request
    delete axios.defaults.headers.common['Authorization'];
    const response = await axiosInstance.post(`${API_URL}/register`, user);
    return response.data; // Return the registered user data
  },

    // Login a user and store the token
    loginUser: async (user: { email: string; password: string }) => {
      try {
          delete axios.defaults.headers.common['Authorization']; // Ensure no Authorization header for login
          const response = await axiosInstance.post(`${API_URL}/login`, user);
          return response.data;
      } catch (error: any) {
          console.error("Login failed:", error.response?.data || error.message);
          throw new Error(error.response?.data?.message || "Login failed. Please try again.");
      }
  },
  
  
  // Logout user by removing the token
  logoutUser: () => {
    localStorage.removeItem('accessToken'); // Remove token from localStorage
    setAuthToken(null); // Remove token from axios headers
  },

  // Fetch a list of users (requires authorization)
  getUsers: async () => {
    const token = localStorage.getItem('accessToken'); // Retrieve token directly before request
    if (token) {
      setAuthToken(token); // Set the token in the Authorization header if available
    }
    const response = await axiosInstance.get(`${API_URL}/users`); // Now includes the Authorization header
    console.log(response);
    return response.data;
  },

  // Fetch a single user by ID (requires authorization)
  getUserById: async (id: number) => {
    const token = localStorage.getItem('accessToken'); // Retrieve token directly before request
    if (token) {
      setAuthToken(token); // Set the token in the Authorization header if available
    }
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Update an existing user (requires authorization)
  updateUser: async ({ id, user }: { id: number; user: {email?: string; username?: string; password?: string; roles?: string[] } }) => {
    const token = localStorage.getItem('accessToken'); // Retrieve token directly before request
    if (token) {
      setAuthToken(token); // Set the token in the Authorization header if available
    }
    const response = await axiosInstance.put(`${API_URL}/${id}`, user);
    return response.data;
  },

  // Delete a user by ID (requires authorization)
  deleteUser: async (id: number) => {
    const token = localStorage.getItem('accessToken'); // Retrieve token directly before request
    if (token) {
      setAuthToken(token); // Set the token in the Authorization header if available
    }
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
  }
};
