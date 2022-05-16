import { gql } from 'apollo-angular';

export const RENAME_FAVORITE_LIST = gql`
  mutation renameFavoriteList($input: UpdateFavoriteListInput!) {
    renameFavoriteList(input: $input) {
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
