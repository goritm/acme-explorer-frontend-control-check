import { ApplicationState } from 'src/utils/enums/application-state.enum';
import { IBaseEntity } from 'src/utils/interfaces/base-entity.interface';
import { IUser } from 'src/utils/interfaces/user.interface';
import { ITrip } from '../../trip/interfaces/trip.interface';

export interface IApplication extends IBaseEntity {
  explorer: IUser;
  manager: IUser;
  comments: string[];
  reasonCancelled?: string;
  trip: ITrip;
  state: ApplicationState;
}
