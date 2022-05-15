import { IBaseEntity } from 'src/utils/interfaces/base-entity.interface';

export type ResponseUpdateConfigurationMutation = {
  updateConfiguration: IBaseEntity & {
    flatRate: number;
  };
};
