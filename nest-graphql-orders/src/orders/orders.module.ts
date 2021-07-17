import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CustomersService } from 'src/customers/customers.service';

import { OrderItemResolver, OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [HttpModule],
  providers: [
    OrdersResolver,
    OrdersService,
    CustomersService,
    OrderItemResolver,
  ],
})
export class OrdersModule {}
