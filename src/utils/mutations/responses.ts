import { IBaseEntity } from 'src/app/shared/interfaces/base-entity.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';

export interface ResponseLoginMutation {
  signInUser: {
    accessToken: string;
    user: IUser & IBaseEntity;
  };
}

export interface ResponseSignUpMutation {
  signUpUser: {
    accessToken: string;
    user: IUser & IBaseEntity;
  };
}
