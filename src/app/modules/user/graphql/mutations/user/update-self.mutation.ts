import { gql } from 'apollo-angular';
import { USER_DATA } from 'src/utils/fragments/fragments';

export const UPDATE_SELF = gql`
  mutation updateSelf($input: UpdateUserPayload!) {
    updateSelf(input: $input) {
      ...UserData
    }
  }
  ${USER_DATA}
`;
