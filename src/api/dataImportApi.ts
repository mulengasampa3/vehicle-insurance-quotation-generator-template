import axios from 'axios';
import axiosInstance from './axiosConfig';

const API_BASE_URL = 'http://localhost:8080/api/data-import';

// Upload file to import data into the specified table
export const importData = async (tableName: string, file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('tableName', tableName);
  formData.append('file', file);

  const response = await axiosInstance.post(`${API_BASE_URL}/import`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  console.log(response)
  
  return response.data;
};
