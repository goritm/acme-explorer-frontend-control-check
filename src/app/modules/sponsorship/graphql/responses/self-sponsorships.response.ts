import { Sponsorship } from '../types/sponsorship.type';

export type ResponseSelfSponsorshipsQuery = {
  getSelfSponsorships: {
    count: number;
    data: Sponsorship[];
  };
};
