import { User } from 'src/app/modules/authentication/types/user.type';
import { Trip } from 'src/app/modules/trip/graphql/types/trip.type';
import { BaseEntity } from 'src/utils/classes/base.entity';
import { SponsorshipState } from '../enums/sponsorship-states.enum';

export type Sponsorship = BaseEntity & {
  sponsor: User;
  trip: Trip;
  state: SponsorshipState;
  banner: string;
  link: string;
};
