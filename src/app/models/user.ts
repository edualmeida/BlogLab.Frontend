export interface User {
  id: string;
  email: string;
  password: string;
  token: string;
}

export interface RegisterUser {
  name: string;
  middleName: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  token: string;
  userid: string;
  username: string;
  isAdmin: boolean;
}

export interface TokenUser {
  nameid: string;
  unique_name: string;
  role: string;
}
