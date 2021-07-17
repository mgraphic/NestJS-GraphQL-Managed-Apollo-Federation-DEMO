import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Customer } from 'src/graphql.schema';

@Injectable()
export class CustomersService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpService) {}

  public getAllCustomers(): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(`${this.apiUrl}/customers`)
      .pipe(map(({ data }) => data));
  }

  public getCustomerById(id: string): Observable<Customer> {
    return this.http
      .get<Customer>(`${this.apiUrl}/customers/${id}`)
      .pipe(map(({ data }) => data));
  }
}
