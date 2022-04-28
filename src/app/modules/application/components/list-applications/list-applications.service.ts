import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FilterInputParams } from 'src/utils/inputs/filter-input-params';
import { GET_SELF_APPLICATIONS } from 'src/utils/queries/queries';
import { ResponseListApplicationsQuery } from 'src/utils/queries/responses';

@Injectable({
  providedIn: 'root'
})
export class ListApplicationsService {
  start = 0;
  limit = 10;
  where: unknown = {};

  constructor(private apollo: Apollo) {}

  fetch(params?: FilterInputParams) {
    if (params) {
      const { start, limit, where } = params;
      this.start = start || this.start;
      this.limit = limit || this.limit;
      this.where = where || this.where;
    }
    return this.apollo.query<ResponseListApplicationsQuery>({
      query: GET_SELF_APPLICATIONS,
      variables: {
        start: this.start,
        limit: this.limit,
        where: this.where
      }
    });
  }
}
