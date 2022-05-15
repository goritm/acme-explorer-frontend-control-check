import { gql } from 'apollo-angular';

export const UPDATE_CONFIGURATION = gql`
  mutation updateConfiguration($input: UpdateConfigurationInput!) {
    updateConfiguration(input: $input) {
      id
      flatRate
    }
  }
`;
