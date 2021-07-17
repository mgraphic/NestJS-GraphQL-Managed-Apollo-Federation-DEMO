import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Product } from 'src/graphql.schema';

@Injectable()
export class ProductsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpService) {}

  public getAllProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.apiUrl}/products`)
      .pipe(map(({ data }) => data));
  }

  public getProductById(id: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.apiUrl}/products/${id}`)
      .pipe(map(({ data }) => data));
  }
}
