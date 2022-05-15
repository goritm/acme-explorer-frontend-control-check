import { ITrip } from 'src/app/modules/trip/interfaces/trip.interface';
import { IApplication } from 'src/app/modules/application/graphql/interfaces/application.interface';

export interface ResponseTripByIDQuery {
  getTripById: ITrip;
}

export interface ResponseListTripsQuery {
  listTrips: {
    count: number;
    data: ITrip[];
  };
}

export interface ResponseListApplicationsQuery {
  getSelfApplications: {
    count: number;
    data: IApplication[];
  };
}
