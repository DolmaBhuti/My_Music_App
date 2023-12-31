import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import User from './User';
import RegisterUser from './RegisterUser';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private userAPIBase = environment.userAPIBase;

  getEmail() {
    return localStorage.getItem('email');
  }
  getToken() {
    // Retrieves the value associated with the key 'accessToken' from localStorage
    return localStorage.getItem('accessToken');
  }
  public getRefreshToken() {
    return localStorage.getItem('refreshToken');
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
    const token = this.getToken();
    console.log(token, 'in isAuthenticated');

    //check if accessToken is expired
    if (!!token && !helper.isTokenExpired(token)) {
      return true;
    } else {
      this.refreshToken();
      return false;
    }
  }

  refreshToken() {
    return this.http.post(this.userAPIBase + 'refresh-token', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { refreshToken: this.getRefreshToken() },
    });
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.userAPIBase}/login`, user);
  }
  logout() {
    const rToken = localStorage.getItem('refreshToken');
    localStorage.clear();
    console.log('localStorage length' + localStorage.length);

    return this.http.delete<any>(`${this.userAPIBase}/logout`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { refreshToken: rToken },
    });
  }

  registerUser(registerUser: RegisterUser): Observable<any> {
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json;');
    return this.http.post<any>(
      `${this.userAPIBase}/register`,
      registerUser // { headers }
    );
  }
}
