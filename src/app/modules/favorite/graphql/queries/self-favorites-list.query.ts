import { gql } from 'apollo-angular';

export const SELF_FAVORITES_LIST = gql`
  query selfFavoritesList($start: Int, $limit: Int, $where: JSON) {
    selfFavoritesList(input: { start: $start, limit: $limit, where: $where }) {
      id
      trips {
        id
        title
        description
        price
        pictures
      }
      name
      user
    }
  }
`;
