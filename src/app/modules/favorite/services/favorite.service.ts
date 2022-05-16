import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { FilterInputParams } from 'src/utils/inputs/filter-input-params';
import { ResponseSelfFavoritesListQuery } from '../graphql/types/self-favorites-list-reponse.type';
import { SELF_FAVORITES_LIST } from '../graphql/queries/self-favorites-list.query';
import { RENAME_FAVORITE_LIST } from '../graphql/mutations/rename-favorite-list.mutation';
import { UpdateFavoriteListInput } from '../graphql/inputs/update-favorite-list.input';
import { DELETE_FAVORITE_LIST } from '../graphql/mutations/delete-favorite-list.mutation';
import { RemoveFavoriteTripInput } from '../graphql/inputs/remove-favorite-trip.input';
import { AddFavoriteTripInput } from '../graphql/inputs/add-favorite-trip.input';
import { ResponseDeleteFavoriteListMutation } from '../graphql/types/delete-favorite-list-response.type';
import { ResponseRenameFavoriteListMutation } from '../graphql/types/rename-favorite-list-response.type';
import { GET_SELF_FAVORITE_LIST } from '../graphql/queries/get-self-favorite-list.query';
import { ResponseGetSelfFavoriteListQuery } from '../graphql/types/get-self-favorite-list-reponse.type';
import { REMOVE_FAVORITE_TRIP } from '../graphql/mutations/remove-favorite-trip.mutation';
import { ADD_FAVORITE_TRIP } from '../graphql/mutations/add-favorite-trip.mutation';
import { ResponseRemoveFavoriteTripMutation } from '../graphql/types/remove-favorite-trip-response.type';
import { ResponseAddFavoriteTripMutation } from '../graphql/types/add-favorite-trip-response.type';

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

  getSelfFavoriteListById(id: string) {
    return this.apollo.query<ResponseGetSelfFavoriteListQuery>({
      query: GET_SELF_FAVORITE_LIST,
      variables: {
        id
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

  deleteFavoriteList(id: string) {
    return this.apollo.mutate<ResponseDeleteFavoriteListMutation>({
      mutation: DELETE_FAVORITE_LIST,
      variables: {
        id
      }
    });
  }

  deleteFavoriteTrip(removeFavoriteTripInput: RemoveFavoriteTripInput) {
    return this.apollo.mutate<ResponseRemoveFavoriteTripMutation>({
      mutation: REMOVE_FAVORITE_TRIP,
      variables: {
        input: removeFavoriteTripInput
      }
    });
  }

  addFavoriteTrip(addFavoriteTripInput: AddFavoriteTripInput) {
    return this.apollo.mutate<ResponseAddFavoriteTripMutation>({
      mutation: ADD_FAVORITE_TRIP,
      variables: {
        input: addFavoriteTripInput
      }
    });
  }
}
