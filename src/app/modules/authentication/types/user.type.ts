import { IBaseEntity } from 'src/utils/interfaces/base-entity.interface';

export type User = IBaseEntity & {
  name: string;
  lastName: string;
  email: string;
  profilePicture: string;
};
