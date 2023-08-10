import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.class';

@Injectable({ providedIn: 'root' })

export class ProductsService {

  private apiUrl = 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
      return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(prod: Product): Observable<Product> {
      return this.http.post<Product>(this.apiUrl, prod);
  }

  update(prod: Product): Observable<Product> {
      return this.http.patch<Product>(`${this.apiUrl}/${prod.id}`, prod);
  }

  delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
