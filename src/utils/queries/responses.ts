import { ITrip } from 'src/app/modules/trip/interfaces/trip.interface';
import { Trip } from 'src/app/modules/trip/graphql/types/trip.type';
import { IApplication } from 'src/app/modules/application/graphql/interfaces/application.interface';

export interface ResponseTripByIDQuery {
  getTripById: ITrip;
}

export interface ResponsePublishSelfTripQuery {
  publishSelfTrip: ITrip;
}

export interface ResponseGetTripsQuery {
  getTrips: Trip[];
}

export interface ResponseListTripsQuery {
  listTrips: {
    count: number;
    data: Trip[];
  };
}

export interface ResponseListApplicationsQuery {
  getSelfApplications: {
    count: number;
    data: IApplication[];
  };
}

export interface ResponseGetApplicationByIdQuery {
  getApplicationById: IApplication;
}
