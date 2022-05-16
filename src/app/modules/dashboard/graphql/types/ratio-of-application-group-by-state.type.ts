import { ApplicationState } from 'src/utils/enums/application-state.enum';

export type RatioOfApplicationGroupByState = {
  ratio: number;
  state: ApplicationState;
};
