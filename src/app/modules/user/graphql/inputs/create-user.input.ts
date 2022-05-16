import { UserRoles } from 'src/utils/enums/user-roles.enum';

export type CreateUserInput = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRoles;
  telephoneNumber?: string;
  profilePicture?: string;
  address?: string;
};
