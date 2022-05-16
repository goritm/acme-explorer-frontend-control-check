import { Finder } from './finder.type';

export type ResponseGetSelfFindersQuery = {
  getSelfFinders: {
    count: number;
    data: Finder[];
  };
};
