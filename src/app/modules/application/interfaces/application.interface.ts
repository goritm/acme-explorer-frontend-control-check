import { IBaseEntity } from 'src/app/shared/interfaces/base-entity.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { ITrip } from '../../trip/interfaces/trip.interface';

enum ApplicationState {
  ACCEPTED = 'accepted',
  CANCELLED = 'cancelled',
  DUE = 'due',
  PENDING = 'pending',
  REJECTED = 'rejected'
}

export interface IApplication extends IBaseEntity {
  explorer: IUser;
  manager: IUser;
  comments: string[];
  reasonCancelled?: string;
  trip: ITrip;
  state: ApplicationState;
}
