import { gql } from 'apollo-angular';
import { FINDER_DATA } from 'src/utils/fragments/fragments';

export const UPDATE_SELF_FINDER = gql`
  mutation updateSelfFinder($input: UpdateFinderInput!) {
    updateSelfFinder(input: $input) {
      ...FinderData
    }
  }
  ${FINDER_DATA}
`;
