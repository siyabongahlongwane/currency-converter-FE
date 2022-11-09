import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// export interface User {
//   user: {
//     _id: string,
//     firstName: string,
//     lastName: string,
//     username: string,
//     password: string,
//     role: {
//       id: string,
//       description: string
//     },
//     privileges: object,
//   }
//   msg: string
// }
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // serverUrl: string = 'http://localhost:5000';
  serverUrl: string = 'https://currencyratehubapi.herokuapp.com';

  constructor(private http: HttpClient) {

  }

  login(endpoint: any): Observable<any> {
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.get<any>(url);
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

  getUsers(endpoint: string): Observable<any> {
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.get<any>(url);
  }

  addUser(endpoint: string, body: any): Observable<any> {
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.post<any>(url, body);
  }

  deleteUser(endpoint: string): Observable<any> {
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.delete<any>(url);
  }

  updateUser(endpoint: string, body: any): Observable<any> {
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.put<any>(url, body);
  }
}
