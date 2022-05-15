import { gql } from 'apollo-angular';
import { APPLICATION_DATA } from 'src/utils/fragments/fragments';

export const CANCEL_APPLICATION = gql`
  mutation cancelSelfApplication($id: ID!) {
    cancelSelfApplication(id: $id) {
      ...ApplicationData
    }
  }
  ${APPLICATION_DATA}
`;
