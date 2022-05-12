import { gql } from 'apollo-angular';
import { TRIP_DATA } from 'src/utils/fragments/fragments';

export const SELF_TRIPS = gql`
  query getSelfTrips($start: Int, $limit: Int, $where: JSON) {
    getSelfTrips(input: { start: $start, limit: $limit, where: $where }) {
      count
      data {
        ...TripData
      }
    }
  }
  ${TRIP_DATA}
`;
