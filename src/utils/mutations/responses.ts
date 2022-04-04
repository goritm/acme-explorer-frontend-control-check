import { IBaseEntity } from 'src/app/shared/interfaces/base-entity.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';

export interface ResponseLoginMutation {
  signInUser: {
    accessToken: string;
    user: IUser & IBaseEntity;
  };
}
