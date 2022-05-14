import { gql } from 'apollo-angular';
import { APPLICATION_DATA } from 'src/utils/fragments/fragments';

export const REJECT_APPLICATION = gql`
  mutation rejectApplication($id: ID!, $reasonRejected: String!) {
    rejectApplication(id: $id, reasonRejected: $reasonRejected) {
      ...ApplicationData
    }
  }
  ${APPLICATION_DATA}
`;
