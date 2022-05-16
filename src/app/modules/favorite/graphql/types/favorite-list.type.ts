import { Trip } from 'src/app/modules/trip/graphql/types/trip.type';
import { IBaseEntity } from 'src/utils/interfaces/base-entity.interface';

export type FavoriteList = IBaseEntity & {
  name: string;
  user: string;
  trips: Trip[];
};
