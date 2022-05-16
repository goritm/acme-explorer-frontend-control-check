export type UpdateFinderInput = {
  where: {
    id: string;
  };
  data: {
    keyword?: string;
    minDate?: string;
    maxDate?: string;
    minPrice?: number;
    maxPrice?: number;
  };
};
