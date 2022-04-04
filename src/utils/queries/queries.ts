import { gql } from 'apollo-angular';

export const GET_USER = gql`
  query Self {
    self {
      id
      email
      name
      lastName
      telephoneNumber
      address
      profilePicture
      role
    }
  }
`;
