import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CollectionsService } from 'src/collections/collections.service';

import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [HttpModule],
  providers: [ProductsService, ProductsResolver, CollectionsService],
})
export class ProductsModule {}
