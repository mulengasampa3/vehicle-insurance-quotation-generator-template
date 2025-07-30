export interface RegisterData {
    email: string;
    password: string;
    name: string;
  }
  
  export interface PasswordResetRequestData {
    email: string;
  }
  
  export interface VerifyTokenData {
    email: string;
    token: string;
  }
  
  export interface PasswordResetData {
    email: string;
    token: string;
    newPassword: string;
  }

export interface PasswordResetRequest {
    email: string;
  }
  
  export interface VerifyTokenRequest {
    email: string;
    token: string;
  }
  
  