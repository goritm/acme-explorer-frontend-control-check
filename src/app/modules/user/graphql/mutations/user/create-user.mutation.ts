import { gql } from 'apollo-angular';
import { USER_DATA } from 'src/utils/fragments/fragments';

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ...UserData
    }
  }
  ${USER_DATA}
`;
