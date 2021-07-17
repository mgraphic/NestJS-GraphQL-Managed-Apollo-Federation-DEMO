import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { map, Observable } from 'rxjs';

import { Order } from 'src/graphql.schema';

@Injectable()
export class OrdersService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpService) {}

  public getAllOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(`${this.apiUrl}/orders`)
      .pipe(map(({ data }) => data));
  }

  public getOrderById(id: string): Observable<Order> {
    return this.http
      .get<Order>(`${this.apiUrl}/orders/${id}`)
      .pipe(map(({ data }) => data));
  }
}
