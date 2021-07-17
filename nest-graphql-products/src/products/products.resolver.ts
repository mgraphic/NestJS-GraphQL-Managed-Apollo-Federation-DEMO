import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import { Observable } from 'rxjs';

import { CollectionsService } from 'src/collections/collections.service';
import { Product } from 'src/graphql.schema';

import { ProductsService } from './products.service';

@Resolver('Product')
export class ProductsResolver {
  constructor(
    private productsService: ProductsService,
    private collectionsService: CollectionsService,
  ) {}

  @Query()
  public products(): Observable<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Query()
  public product(@Args('id') id: string): Observable<Product> {
    return this.productsService.getProductById(id);
  }

  @ResolveField('collectionEntity')
  getCollection(@Parent() product: Product) {
    return { __typename: 'Collection', id: product.collectionId };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.productsService.getProductById(reference.id);
  }
}
