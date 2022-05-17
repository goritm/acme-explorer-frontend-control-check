import { StageInput } from './stage.input';

export type UpdateTripInput = {
  data: {
    title: string;
    description: string;
    endDate: string;
    startDate: string;
    reasonCancelled: string;
    stages: StageInput[];
    price: number;
    requirements: string[];
    pictures: string[];
    dates?: string[];
  };
  where: {
    id: string;
  };
};
