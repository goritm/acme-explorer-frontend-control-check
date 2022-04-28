import { BaseEntity } from 'src/utils/classes/base.entity';
import { TripState } from 'src/utils/enums/trip-state.enum';
import { User } from '../../authentication/types/user.type';
import { Stage } from './stage.type';

export type Trip = BaseEntity & {
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
  stages: Stage[];
  manager: User;
};
