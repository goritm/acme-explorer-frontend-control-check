import { gql } from 'apollo-angular';

export const UNLOCK_USER = gql`
  mutation unlockUser($id: String!) {
    unlockUser(id: $id) {
      id
    }
  }
`;
