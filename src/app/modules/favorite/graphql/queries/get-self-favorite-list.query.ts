import { gql } from 'apollo-angular';

export const GET_SELF_FAVORITE_LIST = gql`
  query getSelfFavoriteListById($id: ID!) {
    getSelfFavoriteListById(id: $id) {
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
