import { gql } from 'apollo-angular';

export const DELETE_FAVORITE_LIST = gql`
  mutation deleteFavoriteList($id: ID!) {
    deleteFavoriteList(id: $id) {
      id
      name
      trips {
        id
        title
        description
        price
        startDate
        endDate
        ticket
      }
      user
    }
  }
`;
