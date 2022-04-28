import { CreateStageInput } from './create-stage.input';

export type CreateTripInput = {
  title: string;
  description: string;
  endDate: string;
  startDate: string;
  stages: CreateStageInput[];
  requirements: string[];
  pictures: string[];
};
