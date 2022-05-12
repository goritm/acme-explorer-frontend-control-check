import { IBaseEntity } from 'src/utils/interfaces/base-entity.interface';
import { IUser } from 'src/utils/interfaces/user.interface';
import { ITrip } from '../../trip/interfaces/trip.interface';
import { SponsorshipState } from '../graphql/enums/sponsorship-states.enum';

export interface ISponsorship extends IBaseEntity {
  sponsor: IUser;
  banner: string;
  link: string;
  trip: ITrip;
  state: SponsorshipState;
}
