import { gql } from 'apollo-angular';
import { TRIP_DATA, TRIP_USER_DATA } from 'src/utils/fragments/fragments';

export const SPONSOR_DATA = gql`
  fragment SponsorData on Sponsorship {
    id
    link
    banner
    sponsor {
      ...TripUserData
    }
    state
    trip {
      ...TripData
    }
  }
  ${TRIP_DATA}
  ${TRIP_USER_DATA}
`;
