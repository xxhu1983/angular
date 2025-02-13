import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customers`);
  }

  getTickers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tickers`);
  }

  getTickerDetail(tickerId: string): Observable<any> {
    //return this.http.get<any>(`${this.apiUrl}/tickerDetails/${tickerId}`);
    return this.http.get<any>(`${this.apiUrl}/tickerDetails?id=${tickerId}`);
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/items`);
  }
}