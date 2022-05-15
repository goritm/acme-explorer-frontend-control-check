import { gql } from 'apollo-angular';

export const LIST_CONFIGURATIONS = gql`
  query listConfigurations($start: Int, $limit: Int, $where: JSON) {
    listConfigurations(input: { start: $start, limit: $limit, where: $where }) {
      count
      data {
        id
        flatRate
      }
    }
  }
`;
