import { UserRoles } from 'src/utils/enums/user-roles.enum';
import { IBaseEntity } from 'src/utils/interfaces/base-entity.interface';
import { UserStatus } from '../enum/user-status.enum';

export type UserAdmin = IBaseEntity & {
  name: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  telephoneNumber?: string;
  address?: string;
  status: UserStatus;
  role: UserRoles;
};
