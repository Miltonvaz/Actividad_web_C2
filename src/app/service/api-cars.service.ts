import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cars } from '../models/cars';

@Injectable({
  providedIn: 'root'
})
export class ApiCarsService {
  private url: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addCars(cars: Cars): Observable<Cars> {
    const urlApi = `${this.url}/cars/`;
    return this.http.post<Cars>(urlApi, cars, { headers: this.getHeaders() });
  }
  updateCar(carId: number, data: Cars): Observable<Cars> {
    const urlApi = `${this.url}/cars/${carId}`;
    return this.http.put<Cars>(urlApi, data, { headers: this.getHeaders() }); 
  }

  getCars(): Observable<Cars[]> {
    const urlApi = `${this.url}/allCars/`;
    return this.http.get<Cars[]>(urlApi, { headers: this.getHeaders() }); 
  }

  getCarById(car_id: number): Observable<Cars> {
    const urlApi = `${this.url}/cars/${car_id}`;
    return this.http.get<Cars>(urlApi, { headers: this.getHeaders() }); 
  }

  deleteCar(carId: number): Observable<void> {
    const urlApi = `${this.url}/cars/${carId}`;
    return this.http.delete<void>(urlApi, { headers: this.getHeaders() });
  }
}
