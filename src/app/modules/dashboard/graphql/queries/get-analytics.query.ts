import { gql } from 'apollo-angular';

export const GET_ANALITYCS = gql`
  query getAnalitycs {
    getAnalitycs {
      pricePerTrip {
        average
        max
        min
        std
      }
      applicationPerTrip {
        average
        max
        min
        std
      }
      tripManagedPerManager {
        average
        max
        min
        std
      }
      ratioOfApplicationGroupByState {
        ratio
        state
      }
    }
  }
`;
