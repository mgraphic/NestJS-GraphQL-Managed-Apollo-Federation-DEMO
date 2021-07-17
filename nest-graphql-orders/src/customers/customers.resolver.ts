import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';

import { Observable } from 'rxjs';

import { Customer } from 'src/graphql.schema';

import { CustomersService } from './customers.service';

@Resolver('Customer')
export class CustomersResolver {
  constructor(private customersService: CustomersService) {}

  @Query()
  public customers(): Observable<Customer[]> {
    return this.customersService.getAllCustomers();
  }

  @Query()
  public customer(@Args('id') id: string): Observable<Customer> {
    return this.customersService.getCustomerById(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.customersService.getCustomerById(reference.id);
  }
}
