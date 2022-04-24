import { IBaseEntity } from 'src/app/shared/interfaces/base-entity.interface';

export interface IStage extends IBaseEntity {
  title: string;
  description: string;
  price: number;
}
