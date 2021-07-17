import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Collection } from 'src/graphql.schema';

@Injectable()
export class CollectionsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpService) {}

  public getAllCollections(): Observable<Collection[]> {
    return this.http
      .get<Collection[]>(`${this.apiUrl}/collections`)
      .pipe(map(({ data }) => data));
  }

  public getCollectionById(id: string): Observable<Collection> {
    return this.http
      .get<Collection>(`${this.apiUrl}/collections/${id}`)
      .pipe(map(({ data }) => data));
  }
}
