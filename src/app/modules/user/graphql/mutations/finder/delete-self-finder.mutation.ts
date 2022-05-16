import { gql } from 'apollo-angular';
import { FINDER_DATA } from 'src/utils/fragments/fragments';

export const DELETE_SELF_FINDER = gql`
  mutation deleteSelfFinder($id: ID!) {
    deleteSelfFinder(id: $id) {
      ...FinderData
    }
  }
  ${FINDER_DATA}
`;
