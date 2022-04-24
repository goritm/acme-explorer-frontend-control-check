import { ITrip } from 'src/app/modules/trip/interfaces/trip.interface';

export interface ResponseListTripsQuery {
  listTrips: {
    count: number;
    data: ITrip[];
  };
}
