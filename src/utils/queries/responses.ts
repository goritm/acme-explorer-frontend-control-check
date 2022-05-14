import { ITrip } from 'src/app/modules/trip/interfaces/trip.interface';
import { IApplication } from 'src/app/modules/application/interfaces/application.interface';
import { Trip } from 'src/app/modules/trip/graphql/types/trip.type';

export interface ResponseTripByIDQuery {
  getTripById: ITrip;
}

export interface ResponsePublishSelfTripQuery {
  publishSelfTrip: ITrip;
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
