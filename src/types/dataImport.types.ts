// Available tables for data import
export type TableName = 'users' | 'orders' | 'products' | 'customers';

// API response types
export interface ImportDataResponse {
  message: string;
}

export interface FileUploadProps {
    onUpload: (tableName: TableName, file: File) => void;
  }