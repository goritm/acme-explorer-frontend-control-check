import { gql } from 'apollo-angular';
import { SPONSOR_DATA } from './../../../sponsorship/graphql/fragments/sponsor-data.fragment';

export const PAY_SPONSORSHIP = gql`
  mutation paySelfSponsorship($id: ID!) {
    paySelfSponsorship(id: $id) {
      ...SponsorData
    }
  }
  ${SPONSOR_DATA}
`;
