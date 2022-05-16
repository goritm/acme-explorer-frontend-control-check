import { gql } from 'apollo-angular';

export const CREATE_FAVORITE_LIST = gql`
  mutation createFavoriteList($input: CreateFavoriteListInput!) {
    createFavoriteList(input: $input) {
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
