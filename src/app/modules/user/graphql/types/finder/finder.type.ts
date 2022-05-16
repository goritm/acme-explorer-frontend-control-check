import { IBaseEntity } from 'src/utils/interfaces/base-entity.interface';

export type Finder = IBaseEntity & {
  keyword: string;
  minDate: string;
  maxDate: string;
  minPrice: number;
  maxPrice: number;
  user: string;
};
