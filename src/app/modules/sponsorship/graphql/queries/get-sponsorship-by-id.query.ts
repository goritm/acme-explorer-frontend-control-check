import { gql } from 'apollo-angular';
import { SPONSOR_DATA } from '../fragments/sponsor-data.fragment';

export const GET_SPONSORSHIP = gql`
  query getSponsorshipById($id: ID!) {
    getSponsorshipById(id: $id) {
      ...SponsorData
    }
  }
  ${SPONSOR_DATA}
`;
