import { gql } from 'apollo-angular';
import { SPONSOR_DATA } from '../fragments/sponsor-data.fragment';

export const GET_SPONSORSHIPS = gql`
  query getSponsorships($start: Int, $limit: Int, $where: JSON) {
    getSponsorships(input: { start: $start, limit: $limit, where: $where }) {
      ...SponsorData
    }
  }
  ${SPONSOR_DATA}
`;
