import { UserAdmin } from './user-admin.type';

export type ResponseListUsersQuery = {
  listUsers: {
    count: number;
    data: UserAdmin[];
  };
};
