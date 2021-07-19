import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';

import { Observable } from 'rxjs';

import { Collection } from 'src/graphql.schema';

import { CollectionsService } from './collections.service';

@Resolver('Collection')
export class CollectionsResolver {
  constructor(private collectionsService: CollectionsService) {}

  @Query()
  public collections(): Observable<Collection[]> {
    return this.collectionsService.getAllCollections();
  }

  @Query()
  public collection(@Args('id') id: string): Observable<Collection> {
    return this.collectionsService.getCollectionById(id);
  }
}
