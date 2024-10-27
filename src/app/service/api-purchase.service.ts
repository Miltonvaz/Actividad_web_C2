import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseOrder } from '../models/purchase-order';

@Injectable({
  providedIn: 'root'
})
export class ApiPurchaseService {

  
  private url: string = 'http://127.0.0.1:8000';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) {}

  addCPurchase(purchase: PurchaseOrder): Observable<PurchaseOrder> {
    const urlApi = this.url + '/purchaseOrder/'; 
    console.log(urlApi);
    return this.http.post<PurchaseOrder>(urlApi, purchase, { headers: this.headers });
  }

  updatePurhcase(purchaseId: number, purchase: PurchaseOrder): Observable<PurchaseOrder> {
    const urlApi = `${this.url}/purchaseOrder/${purchaseId}`;
    console.log(urlApi);
    return this.http.put<PurchaseOrder>(urlApi, purchase, { headers: this.headers });
  }

  getCPurchase():Observable<PurchaseOrder[]>{
    let urlApi = this.url + "/allPurchaseOrders/"
    console.log(urlApi)
    return this.http.get<PurchaseOrder[]>(urlApi, {headers: this.headers});
  }

  getCarById(purchase_id: number): Observable<PurchaseOrder> {
    const urlApi = `${this.url}/cars/${purchase_id}`;
    console.log(urlApi);
    return this.http.get<PurchaseOrder>(urlApi, { headers: this.headers });
  }
  

  deletePurchase(purchaseId: number): Observable<void> {
    const urlApi = `${this.url}/purchaseOrder/${purchaseId}`; 
    console.log(urlApi);
    return this.http.delete<void>(urlApi, { headers: this.headers });
  }



}
