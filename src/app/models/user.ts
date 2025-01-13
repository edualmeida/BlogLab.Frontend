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
