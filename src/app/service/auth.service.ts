import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../models/UserLogin.model';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { AUTH_ROUTE } from 'src/utils/API_URL.const';
import { Globals } from './globals.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: any;

  constructor(private httpClient: HttpClient, private globals: Globals) {
    this.jwtHelper = new JwtHelperService();

  }

  loginUser(user: UserLogin): Observable<any> {
    const url = AUTH_ROUTE;
    const body = {
      username: user.username,
      password: user.password
    };
    return this.httpClient.post(url, body);
  }


  saveToken(token) {
    localStorage.setItem('token', token);
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.clear();
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  decodeAndSetCurrentUser(token) {
    const obj = this.getDecodedAccessToken(token);
    this.globals.role = obj.sub;
    this.saveCurrentUserToLocalStorage(obj);
  }

  private saveCurrentUserToLocalStorage(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUserFromLocalStorage(): UserLogin {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }



}
