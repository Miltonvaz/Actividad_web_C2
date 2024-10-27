import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { LoginResponse, Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  
    });
  }

  getUser(): Observable<Users[]> {
    const urlApi = `${this.url}/listUsers/`;
    console.log(urlApi);
    return this.http.get<Users[]>(urlApi, { headers: this.getHeaders() });
  }

  getCarById(user_id: number): Observable<Users> {
    const urlApi = `${this.url}/cars/${user_id}`;
    console.log(urlApi);
    return this.http.get<Users>(urlApi, { headers: this.getHeaders() });
  }


  login(loginRequest: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login/`, loginRequest).pipe(
      tap((response) => {
        console.log('Token:', response.token); 
        localStorage.setItem('access_token', response.token); 
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        throw error; 
      })
    );
  }

  getAuthToken() {
    return localStorage.getItem('access_token') || ''; 
  }
  
  addUser(registerRequest: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.url}/register/`, registerRequest, { headers: this.getHeaders() });
  }

  
}
