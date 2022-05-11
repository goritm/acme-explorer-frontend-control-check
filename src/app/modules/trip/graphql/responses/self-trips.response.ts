import { ITrip } from '../../interfaces/trip.interface';

export interface ResponseSelfTripsQuery {
  getSelfTrips: {
    count: number;
    data: ITrip[];
  };
}
