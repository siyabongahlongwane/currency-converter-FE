import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  user: {
    _id: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    role: string,
    privileges: string,
  }
  msg: string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverUrl: string = 'http://localhost:5000';
  // serverUrl: string = 'https://currencyratehubapi.herokuapp.com';

  constructor(private http: HttpClient) {

  }

  login(endpoint: any): Observable<User> {
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.get<User>(url);
  }

  checkSession(): any {
    return sessionStorage.getItem('user');
  }

  saveSession(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  destroySession() {
    sessionStorage.removeItem('user');
  }

  checkRole(endpoint: any): Observable<any>{
    const username = JSON.parse(this.checkSession())?.username;
      const url = `${this.serverUrl}/${endpoint}/${username}`;
      return this.http.get<any>(url);
  }
}
