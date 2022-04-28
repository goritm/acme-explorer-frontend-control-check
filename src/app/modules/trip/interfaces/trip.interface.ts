import { TripState } from 'src/app/shared/enums/trip-state.enum';
import { IBaseEntity } from 'src/utils/interfaces/base-entity.interface';
import { IUser } from 'src/utils/interfaces/user.interface';
import { IStage } from './stage.interface';

export interface ITrip extends IBaseEntity {
  title: string;
  ticket: string;
  description: string;
  price: number;
  requirements: string[];
  startDate: string;
  endDate: string;
  pictures: string[];
  reasonCancelled?: string;
  state: TripState;
  stages: IStage[];
  manager: IUser;
}
