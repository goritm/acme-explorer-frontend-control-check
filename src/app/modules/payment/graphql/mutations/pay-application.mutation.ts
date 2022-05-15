import { gql } from 'apollo-angular';
import { APPLICATION_DATA } from 'src/utils/fragments/fragments';

export const PAY_APPLICATION = gql`
  mutation paySelfApplication($id: ID!) {
    paySelfApplication(id: $id) {
      ...ApplicationData
    }
  }
  ${APPLICATION_DATA}
`;
