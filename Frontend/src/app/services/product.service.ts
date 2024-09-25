import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/iproduct';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.apiUrl;
    this.myApiUrl = 'api/productos/'


  }

  getListProduct(): Observable<Product[]>{
  return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteProduct(id:number): Observable<void>{
  return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);

  }

  saveProduct(product: Product): Observable<void>{

  return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, product)
  }

  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
  updateProduct(id:number, product: Product): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, product)

  }
}
