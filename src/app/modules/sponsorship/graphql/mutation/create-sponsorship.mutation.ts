import { gql } from 'apollo-angular';
import { TRIP_DATA } from 'src/utils/fragments/fragments';

export const CREATE_SELF_SPONSORSHIP = gql`
  mutation CreateSelfSponsorship($input: CreateSponsorshipInput!) {
    createSelfSponsorship(input: $input) {
      id
      link
      banner
      state
      trip {
        ...TripData
      }
    }
  }
  ${TRIP_DATA}
`;
