import { gql } from 'apollo-angular';
import { SPONSOR_DATA } from '../fragments/sponsor-data.fragment';

export const GET_SELF_SPONSORSHIPS = gql`
  query getSelfSponsorships($start: Int, $limit: Int, $where: JSON) {
    getSelfSponsorships(
      input: { start: $start, limit: $limit, where: $where }
    ) {
      count
      data {
        ...SponsorData
      }
    }
  }
  ${SPONSOR_DATA}
`;
