import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LIST_TRIPS } from 'src/utils/queries/queries';
import { ResponseListTripsQuery } from 'src/utils/queries/responses';
import { FilterInputParams } from 'src/app/shared/inputs/filter-input-params';

/**
 * This is list trip service.
 * Should be used to as an interlayer between UI Components and Fetch trips strategy.
 */
@Injectable()
export class ListTripsService {
  start = 0;
  limit = 10;
  where: unknown = {};

  constructor(private apollo: Apollo) {}

  fetch(listTripsParams?: FilterInputParams) {
    if (listTripsParams) {
      const { start, limit, where } = listTripsParams;
      this.start = start || this.start;
      this.limit = limit || this.limit;
      this.where = where || this.where;
    }

    return this.apollo.query<ResponseListTripsQuery>({
      query: LIST_TRIPS,
      variables: {
        start: this.start,
        limit: this.limit,
        where: this.where
      }
    });
  }
}
