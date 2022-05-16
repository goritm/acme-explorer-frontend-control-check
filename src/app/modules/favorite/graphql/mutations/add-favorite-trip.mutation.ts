import { gql } from 'apollo-angular';

export const ADD_FAVORITE_TRIP = gql`
  mutation addFavoriteTrip($input: AddFavoriteTripInput!) {
    addFavoriteTrip(input: $input) {
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
