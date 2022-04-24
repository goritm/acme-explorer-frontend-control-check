import { ITrip } from 'src/app/modules/trip/interfaces/trip.interface';
import { IApplication } from 'src/app/modules/application/interfaces/application.interface';

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
  listApplications: {
    count: number;
    data: IApplication[];
  };
}
