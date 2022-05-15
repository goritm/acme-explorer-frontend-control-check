import { gql } from 'apollo-angular';
import { APPLICATION_DATA } from 'src/utils/fragments/fragments';

export const ACCEPT_APPLICATION = gql`
  mutation acceptApplication($id: ID!) {
    acceptApplication(id: $id) {
      ...ApplicationData
    }
  }
  ${APPLICATION_DATA}
`;
