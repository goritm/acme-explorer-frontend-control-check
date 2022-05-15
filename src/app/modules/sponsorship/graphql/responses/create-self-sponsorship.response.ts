import { Trip } from 'src/app/modules/trip/graphql/types/trip.type';
import { IBaseEntity } from 'src/utils/interfaces/base-entity.interface';
import { SponsorshipState } from '../enums/sponsorship-states.enum';

export type ResponseCreateSelfSponsorship = {
  createSelfSponsorship: IBaseEntity & {
    banner: string;
    link: string;
    trip: Trip;
    state: SponsorshipState;
  };
};
