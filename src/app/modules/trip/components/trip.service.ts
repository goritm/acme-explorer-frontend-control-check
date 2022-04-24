import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FilterInputParams } from 'src/app/shared/inputs/filter-input-params';
import { GET_TRIP, LIST_TRIPS } from 'src/utils/queries/queries';
import {
  ResponseListTripsQuery,
  ResponseTripByIDQuery
} from 'src/utils/queries/responses';

@Injectable({
  providedIn: 'root'
})
export class TripService {
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

  getTripDetail(id: string | null) {
    return this.apollo.query<ResponseTripByIDQuery>({
      query: GET_TRIP,
      variables: {
        id
      }
    });
  }
}
