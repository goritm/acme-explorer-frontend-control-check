import { UserRoles } from '../enums/user-roles.enum';
import { IBaseEntity } from './base-entity.interface';

export interface IUser extends IBaseEntity {
  name: string;
  lastName: string;
  role: UserRoles;
  telephoneNumber?: string;
  address?: string;
  profilePicture?: string;
  email: string;
}
