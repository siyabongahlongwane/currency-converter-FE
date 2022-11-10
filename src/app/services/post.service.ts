import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  serverUrl: string = 'http://localhost:5000';
  // serverUrl: string = 'https://currencyratehubapi.herokuapp.com';

  constructor(private http: HttpClient) { }

  getPosts(endpoint: string): Observable<any> {
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.get<any>(url);
  }

  addPost(endpoint: string, body: any): Observable<any> {
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.post<any>(url, body);
  }

  deletePost(endpoint: string): Observable<any> {
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.delete<any>(url);
  }

  updatePost(endpoint: string, body: any): Observable<any> {
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.put<any>(url, body);
  }

  sendContactEmail(endpoint: string, body: any) {
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.post<any>(url, body);
  }

}
