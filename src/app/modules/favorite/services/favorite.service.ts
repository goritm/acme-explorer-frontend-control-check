import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { FilterInputParams } from 'src/utils/inputs/filter-input-params';
import { ResponseRenameFavoriteListMutation, ResponseUpdateConfigurationMutation } from '../graphql/types/update-configuration-response.type';
import { ResponseSelfFavoritesListQuery } from '../graphql/types/self-favorites-list-reponse.type';
import { SELF_FAVORITES_LIST } from '../graphql/queries/self-favorites-list.query';
import { RENAME_FAVORITE_LIST } from '../graphql/mutations/rename-favorite-list.mutation';
import { UpdateFavoriteListInput } from '../graphql/inputs/update-favorite-list.input';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  start = 0;
  limit = 10;
  where: unknown = {};
  sort: unknown = {};

  constructor(private apollo: Apollo) {}

  selfFavoriteList(listTripsParams?: FilterInputParams) {
    if (listTripsParams) {
      const { start, limit, where } = listTripsParams;
      this.start = start || this.start;
      this.limit = limit || this.limit;
      this.where = where || this.where;
    }

    return this.apollo.query<ResponseSelfFavoritesListQuery>({
      query: SELF_FAVORITES_LIST,
      variables: {
        start: this.start,
        limit: this.limit,
        where: this.where
      }
    });
  }

  renameFavoriteList(updateFavoriteListInput: UpdateFavoriteListInput) {
    return this.apollo.mutate<ResponseRenameFavoriteListMutation>({
      mutation: RENAME_FAVORITE_LIST,
      variables: {
        input: updateFavoriteListInput
      }
    });
  }

  deleteFavoriteList(updateConfigurationInput: UpdateConfigurationInput) {
    return this.apollo.mutate<ResponseUpdateConfigurationMutation>({
      mutation: UPDATE_CONFIGURATION,
      variables: {
        input: updateConfigurationInput
      }
    });
  }

  deleteFavoriteTrip() {}
  addFavoriteTrip() {}
}
