import { IBaseEntity } from 'src/app/shared/interfaces/base-entity.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
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
  stages: IStage[];
  manager: IUser;
}
