import { gql } from 'apollo-angular';

export const LOCK_USER = gql`
  mutation lockUser($id: String!) {
    lockUser(id: $id) {
      id
    }
  }
`;
