import { ApplicationPerTrip } from './application-per-trip.type';
import { PricePerTrip } from './price-per-trip.type';
import { RatioOfApplicationGroupByState } from './ratio-of-application-group-by-state.type';
import { TripManagedPerManager } from './trip-managed-per-manager.type';

export type ResponseGetAnalyticsQuery = {
  getAnalitycs: {
    pricePerTrip: PricePerTrip;
    applicationPerTrip: ApplicationPerTrip;
    tripManagedPerManager: TripManagedPerManager;
    ratioOfApplicationGroupByState: RatioOfApplicationGroupByState[];
  };
};
