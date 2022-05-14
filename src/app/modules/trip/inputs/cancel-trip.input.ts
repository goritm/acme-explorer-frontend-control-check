export type CancelTripInput = {
  data: {
    reasonCancelled: string;
  };
  where: {
    id: string;
  };
};
