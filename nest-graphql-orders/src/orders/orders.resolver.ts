import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Observable } from 'rxjs';

import { CustomersService } from 'src/customers/customers.service';

import { Order, OrderItem } from 'src/graphql.schema';
import { OrdersService } from './orders.service';

@Resolver('Order')
export class OrdersResolver {
  constructor(
    private ordersService: OrdersService,
    private customersService: CustomersService,
  ) {}

  @Query()
  public orders(): Observable<Order[]> {
    return this.ordersService.getAllOrders();
  }

  @Query()
  public order(@Args('id') id: string): Observable<Order> {
    return this.ordersService.getOrderById(id);
  }

  @ResolveField('customerEntity')
  getCustomer(@Parent() order: Order) {
    return { __typename: 'Customer', id: order.customerId };
  }
}

@Resolver('OrderItem')
export class OrderItemResolver {
  @ResolveField('productEntity')
  getUser(@Parent() item: OrderItem) {
    return { __typename: 'Product', id: item.productId };
  }
}
