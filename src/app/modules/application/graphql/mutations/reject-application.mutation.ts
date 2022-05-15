import { gql } from 'apollo-angular';
import { APPLICATION_DATA } from 'src/utils/fragments/fragments';

export const REJECT_APPLICATION = gql`
  mutation rejectApplication($input: RejectApplicationInput!) {
    rejectApplication(input: $input) {
      ...ApplicationData
    }
  }
  ${APPLICATION_DATA}
`;
