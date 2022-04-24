import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_TRIP } from 'src/utils/queries/queries';
import { ResponseTripByIDQuery } from 'src/utils/queries/responses';

@Injectable({
  providedIn: 'root'
})
export class TripDetailService {
  constructor(private apollo: Apollo) {}

  getTripDetail(id: string | null) {
    return this.apollo.query<ResponseTripByIDQuery>({
      query: GET_TRIP,
      variables: {
        id
      }
    });
  }
}
