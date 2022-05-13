import { StageInput } from './stage.input';

export type CreateTripInput = {
  dates?: string[];
  title: string;
  description: string;
  endDate: string;
  startDate: string;
  stages: StageInput[];
  requirements: string[];
  pictures: string[];
};
