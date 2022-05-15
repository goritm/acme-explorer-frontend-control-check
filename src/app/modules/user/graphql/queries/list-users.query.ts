import { gql } from 'apollo-angular';

export const LIST_USERS = gql`
  query getListUsers($start: Int, $limit: Int, $where: JSON) {
    listUsers(input: { start: $start, limit: $limit, where: $where }) {
      count
      data {
        id
        name
        lastName
        profilePicture
        address
        role
        status
        telephoneNumber
      }
    }
  }
`;
