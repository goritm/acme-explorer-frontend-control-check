import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_TRIP } from 'src/utils/queries/queries';
import { ITrip } from '../../interfaces/trip.interface';

@Injectable({
  providedIn: 'root'
})
export class TripDetailService {
  constructor(private apollo: Apollo) {}

  getTripDetail(id: string | null) {
    return this.apollo.query<ITrip>({
      query: GET_TRIP,
      variables: {
        id
      }
    });
  }
}
