import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // serverUrl: string = 'http://localhost:5000';
  serverUrl: string = 'https://currencyratehubapi.herokuapp.com';

  constructor(private http: HttpClient) {}

  getCurrencies(endpoint: any): Observable<any> {
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.get<any>(url);
  }

  getCountries(endpoint: any): Observable<any> {
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.get<any>(url);
  }

  sendContactEmail(endpoint: string, body: any){
    const url = `${this.serverUrl}/${endpoint}`;
    return this.http.post<any>(url, body);
  }

}
