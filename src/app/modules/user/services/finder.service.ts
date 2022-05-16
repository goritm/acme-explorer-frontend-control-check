import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { FilterInputParams } from 'src/utils/inputs/filter-input-params';
import { LOCK_USER } from '../graphql/mutations/user/lock-user.mutation';
import { ResponseLockUserMutation } from '../graphql/types/user/lock-user-response.type';
import { GET_SELF_FINDERS } from '../graphql/queries/self-finders.query';
import { ResponseGetSelfFindersQuery } from '../graphql/types/finder/get-self-finders-reponse.type';
import { UpdateFinderInput } from '../graphql/inputs/finder/update-finder.input';
import { UPDATE_SELF_FINDER } from '../graphql/mutations/finder/update-self-finder.mutation';
import { ResponseUpdateSelfFinderMutation } from '../graphql/types/finder/update-self-finder-response.type';

@Injectable({
  providedIn: 'root'
})
export class FinderService {
  start = 0;
  limit = 10;
  where: unknown = {};
  sort: unknown = {};

  constructor(private apollo: Apollo) {}

  list(listTripsParams?: FilterInputParams) {
    if (listTripsParams) {
      const { start, limit, where } = listTripsParams;
      this.start = start || this.start;
      this.limit = limit || this.limit;
      this.where = where || this.where;
    }

    return this.apollo.query<ResponseGetSelfFindersQuery>({
      query: GET_SELF_FINDERS,
      variables: {
        start: this.start,
        limit: this.limit,
        where: this.where
      }
    });
  }

  update(updateFinderInput: UpdateFinderInput) {
    return this.apollo.mutate<ResponseUpdateSelfFinderMutation>({
      mutation: UPDATE_SELF_FINDER,
      variables: {
        input: updateFinderInput
      }
    });
  }

  delete(id: string) {
    return this.apollo.mutate<ResponseLockUserMutation>({
      mutation: LOCK_USER,
      variables: {
        id
      }
    });
  }
}
