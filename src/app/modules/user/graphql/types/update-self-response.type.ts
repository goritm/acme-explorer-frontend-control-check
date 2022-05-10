import { IBaseEntity } from 'src/utils/interfaces/base-entity.interface';
import { IUser } from 'src/utils/interfaces/user.interface';

export type ResponseUpdateSelfMutation = {
  updateSelf: IUser & IBaseEntity;
};
