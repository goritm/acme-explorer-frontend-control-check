import { IBaseEntity } from 'src/utils/interfaces/base-entity.interface';

export type Configuration = IBaseEntity & {
  flatRate: number;
};
