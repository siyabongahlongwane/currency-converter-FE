import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
  serverUrl: string = 'http://localhost:5000';
  // serverUrl: string = 'https://currencyratehubapi.herokuapp.com';

  constructor(private http: HttpClient) { }

  getCommentsCount(endpoint: string): Observable<any> {
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.get<any>(url);
  }
}
