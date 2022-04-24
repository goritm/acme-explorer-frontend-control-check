import { ApplicationState } from 'src/app/shared/enums/application-state.enum';
import { IBaseEntity } from 'src/app/shared/interfaces/base-entity.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { ITrip } from '../../trip/interfaces/trip.interface';

export interface IApplication extends IBaseEntity {
  explorer: IUser;
  manager: IUser;
  comments: string[];
  reasonCancelled?: string;
  trip: ITrip;
  state: ApplicationState;
}
