import { gql } from 'apollo-angular';

export const GET_SELF_FINDERS = gql`
  query getSelfFinders($start: Int, $limit: Int, $where: JSON, $sort: JSON) {
    getSelfFinders(
      input: { start: $start, limit: $limit, where: $where, sort: $sort }
    ) {
      count
      data {
        id
        keyword
        minDate
        maxDate
        minPrice
        maxPrice
      }
    }
  }
`;
