import axios from 'axios';
import axiosInstance from './axiosConfig';

const API_BASE_URL = 'http://localhost:8080/api/templates';

export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Fetch all templates
export const fetchTemplates = async () => {
  const token = localStorage.getItem('accessToken'); // Retrieve token directly before request
  setAuthToken(token); // Set the token in the Authorization header if available
  const response = await axiosInstance.get(`${API_BASE_URL}/all`);
  return response.data;
};

// Create a new template
export const createTemplate = async (name: string, content: string) => {
  const token = localStorage.getItem('accessToken'); // Retrieve token directly before request
  setAuthToken(token); // Set the token in the Authorization header if available
  const response = await axiosInstance.post(`${API_BASE_URL}/create`, { name, content });
  return response.data;
};

// Render a template by name
export const renderTemplate = async (name: string, variables: Record<string, any>) => {
  const token = localStorage.getItem('accessToken'); // Retrieve token directly before request
  setAuthToken(token); // Set the token in the Authorization header if available
  const response = await axiosInstance.post(`${API_BASE_URL}/render/${name}`, variables);
  return response.data;
};

// Update a template
export const updateTemplate = async (id: number, content: string) => {
  const token = localStorage.getItem('accessToken'); // Retrieve token directly before request
  setAuthToken(token); // Set the token in the Authorization header if available
  const response = await axiosInstance.put(`${API_BASE_URL}/update/${id}`, { content });
  return response.data;
};

// Delete a template
export const deleteTemplate = async (id: number) => {
  const token = localStorage.getItem('accessToken'); // Retrieve token directly before request
  setAuthToken(token); // Set the token in the Authorization header if available
  const response = await axiosInstance.delete(`${API_BASE_URL}/delete/${id}`);
  return response.data;
};

// Function to download file
export const downloadFile = async (url: string, data: any, filename: string): Promise<void> => {
let response; 
  const token = localStorage.getItem('accessToken'); // Retrieve token directly before request
  setAuthToken(token); 
   if (url == "/export/pdf") {
    response = await axios.post(`${API_BASE_URL}${url}`, data, {
      headers: {
        'Content-Type': 'text/html', // Sending HTML content type
      },
      responseType: 'blob', // Important to get the file as a blob
    });
   } else {
    response = await axios.post(`${API_BASE_URL}${url}`, data, {
      responseType: 'blob', // Important to get the file as a blob
    });
   }

  
  const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = urlBlob;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);  // Clean up the link element
};



