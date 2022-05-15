import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { FilterInputParams } from 'src/utils/inputs/filter-input-params';
import { UpdateConfigurationInput } from '../graphql/inputs/update-configuration.input';
import { ResponseUpdateConfigurationMutation } from '../graphql/types/update-configuration-response.type';
import { UPDATE_CONFIGURATION } from '../graphql/mutations/update-configuation.mutation';
import { ResponseListConfigurationsQuery } from '../graphql/types/list-configurations-reponse.type';
import { LIST_CONFIGURATIONS } from '../graphql/queries/list-configurations.query';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  start = 0;
  limit = 10;
  where: unknown = {};
  sort: unknown = {};

  constructor(private apollo: Apollo) {}

  listConfigurations(listTripsParams?: FilterInputParams) {
    if (listTripsParams) {
      const { start, limit, where } = listTripsParams;
      this.start = start || this.start;
      this.limit = limit || this.limit;
      this.where = where || this.where;
    }

    return this.apollo.query<ResponseListConfigurationsQuery>({
      query: LIST_CONFIGURATIONS,
      variables: {
        start: this.start,
        limit: this.limit,
        where: this.where
      }
    });
  }

  update(updateConfigurationInput: UpdateConfigurationInput) {
    return this.apollo.mutate<ResponseUpdateConfigurationMutation>({
      mutation: UPDATE_CONFIGURATION,
      variables: {
        input: updateConfigurationInput
      }
    });
  }
}
