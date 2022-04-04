import { IBaseEntity } from 'src/app/shared/intefaces/base-entity.interface';
import { IUser } from 'src/app/shared/intefaces/user.interface';

export interface ResponseLoginMutation {
  signInUser: {
    accessToken: string;
    user: IUser & IBaseEntity;
  };
}
