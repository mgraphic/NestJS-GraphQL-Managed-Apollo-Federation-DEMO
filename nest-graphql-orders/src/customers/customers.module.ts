import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CustomersResolver } from './customers.resolver';
import { CustomersService } from './customers.service';

@Module({
  imports: [HttpModule],
  providers: [CustomersResolver, CustomersService],
})
export class CustomersModule {}
