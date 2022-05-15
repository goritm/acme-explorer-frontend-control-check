import { Configuration } from './configuration.type';

export type ResponseListConfigurationsQuery = {
  listConfigurations: {
    count: number;
    data: Configuration[];
  };
};
