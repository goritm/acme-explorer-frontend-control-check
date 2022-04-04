import { UserRoles } from '../enums/user-roles.enum';

export interface IUser {
  name: string;
  lastName: string;
  role: UserRoles;
  telephoneNumber?: string;
  address?: string;
  profilePicture?: string;
  email: string;
}
