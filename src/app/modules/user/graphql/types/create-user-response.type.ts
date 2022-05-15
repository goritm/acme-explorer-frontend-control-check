import { IBaseEntity } from 'src/utils/interfaces/base-entity.interface';
import { UserAdmin } from './user-admin.type';

export type ResponseCreateUserMutation = {
  createUser: UserAdmin & IBaseEntity;
};
