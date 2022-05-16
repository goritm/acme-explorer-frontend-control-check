import { gql } from 'apollo-angular';

export const REMOVE_FAVORITE_TRIP = gql`
  mutation removeFavoriteTrip($input: RemoveFavoriteTripInput!) {
    removeFavoriteTrip(input: $input) {
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
