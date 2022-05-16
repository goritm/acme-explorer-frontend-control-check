import { gql } from 'apollo-angular';

export const GET_FINDER_STATS = gql`
  query getAnalitycs {
    getAnalitycs {
      averageRangePrice {
        maxPrice
        minPrice
      }
      topKeywords {
        count
        keyword
      }
    }
  }
`;
