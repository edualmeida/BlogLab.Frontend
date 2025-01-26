import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginResponse, TokenUser, User } from '../models/user';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { IDENTITY_STORAGE_KEY } from '../store/reducers/auth.reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = environment.identityBaseUrl;
  public ADMIN_ROLE = 'Administrator';

  constructor(private http: HttpClient) {}

  isAdminAuthenticated(): boolean {
    const item = localStorage.getItem(IDENTITY_STORAGE_KEY);
    return item ? JSON.parse(item).isAdmin : null;
  }

  isAuthenticated() {
    const item = localStorage.getItem(IDENTITY_STORAGE_KEY);
    return item ? JSON.parse(item).isAuthenticated : null;
  }

  getToken(): string {
    const item = localStorage.getItem(IDENTITY_STORAGE_KEY);
    return item ? JSON.parse(item).token : null;
  }

  logout(): void {
    localStorage.removeItem(IDENTITY_STORAGE_KEY);
  }

  decodeTokenUser(token: string): TokenUser {
    return jwtDecode<TokenUser>(token);
  }

  logIn(email: string, password: string): Observable<LoginResponse> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post<LoginResponse>(url, { email, password });
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, { email, password });
  }

  getStatus(): Observable<User> {
    const url = `${this.BASE_URL}/status`;
    return this.http.get<User>(url);
  }
}
