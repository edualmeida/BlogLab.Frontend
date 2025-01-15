import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginResponse, TokenUser, User } from '../models/user';
import { environment } from  '../../environments/environment';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private BASE_URL = environment.identityBaseUrl;
  private TOKEN_STORAGE_KEY = 'token';

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_STORAGE_KEY);
  }
  
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_STORAGE_KEY, token);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_STORAGE_KEY)!;
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);
  }

  getUsername(): string {
    if(!this.isAuthenticated()) {
      console.log('not authenticated');
      return '';
    }

    const token = this.getToken();
    if(!token) {
      return '';
    }

    console.log(token);
    const decodedToken = jwtDecode<TokenUser>(token);
    console.log('decodedToken ');
    console.log(decodedToken);
    return decodedToken.unique_name;//decodedToken.name;
  }

  logIn(email: string, password: string): Observable<LoginResponse> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post<LoginResponse>(url, {email, password});
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, {email, password});
  }

  getStatus(): Observable<User> {
    const url = `${this.BASE_URL}/status`;
    return this.http.get<User>(url);
  }
}
