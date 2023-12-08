import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { environment } from './../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import User from './User';
import RegisterUser from './RegisterUser';
import { env } from 'process';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authAPI: any = environment.userAPIBase;

  getEmail() {
    return localStorage.getItem('email');
  }
  getToken() {
    // Retrieves the value associated with the key 'accessToken' from localStorage
    return localStorage.getItem('accessToken');
  }
  readToken() {
    //pulls the item "access_token" from "localStorage", however it uses "helper" from  "JwtHelperService()" to decode it
    const token = this.getToken();
    if (token) {
      return helper.decodeToken(token);
    } else {
      return null;
    }
  }
  isAuthenticated() {
    //pulls "access_token" from "localstorage". If the token was present in  localStorage, return true, otherwise return false
    const token = this.readToken();
    if (!!token && !helper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  public getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  refreshToken(token: string) {
    return this.http.post(
      this.authAPI + 'refreshtoken',
      {
        refreshToken: this.getRefreshToken(),
      },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}/login`, user);
  }
  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    localStorage.clear();

    console.log('localStorage length' + localStorage.length);
    return this.http.post<any>(`${environment.userAPIBase}/logout`, {
      refreshToken,
    });
  }

  registerUser(registerUser: RegisterUser): Observable<any> {
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json;');
    return this.http.post<any>(
      `${environment.userAPIBase}/register`,
      registerUser // { headers }
    );
  }
}
