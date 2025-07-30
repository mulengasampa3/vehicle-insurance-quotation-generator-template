export interface User {
    id: string;
    username: string;
    email: string;
    active: boolean
    roles: string[];
    password?: string; 
}
  
export interface AuthUserData {
    username: string;
    email: string;
    password: string;
    roles: string[];
}