import { ResponseGetApplicationByIdQuery } from './../../../utils/queries/responses';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FilterInputParams } from 'src/utils/inputs/filter-input-params';
import {
  GET_APLICATION_BY_ID,
  GET_SELF_APPLICATIONS
} from 'src/utils/queries/queries';
import { ResponseListApplicationsQuery } from 'src/utils/queries/responses';
import { ACCEPT_APPLICATION } from './graphql/mutations/accept-application.mutation';
import { AcceptApplicationResponse } from './graphql/responses/accept-application.response';
import { REJECT_APPLICATION } from './graphql/mutations/reject-application.mutation';
import { RejectApplicationResponse } from './graphql/responses/reject-application.response';
import { RejectApplicationInput } from './graphql/inputs/reject-application.input';
import { CancelApplicationResponse } from './graphql/responses/cancel-application.response';
import { CANCEL_APPLICATION } from './graphql/mutations/cancel-application.mutation';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  start = 0;
  limit = 10;
  where: unknown = {};

  constructor(private apollo: Apollo) {}

  fetch(params?: FilterInputParams) {
    if (params) {
      const { start, limit, where } = params;
      this.start = start || this.start;
      this.limit = limit || this.limit;
      this.where = where || this.where;
    }
    return this.apollo.query<ResponseListApplicationsQuery>({
      query: GET_SELF_APPLICATIONS,
      variables: {
        start: this.start,
        limit: this.limit,
        where: this.where
      }
    });
  }

  getApplicationById(id: string) {
    return this.apollo.query<ResponseGetApplicationByIdQuery>({
      query: GET_APLICATION_BY_ID,
      variables: {
        id
      }
    });
  }

  acceptApplication(id: string) {
    return this.apollo.mutate<AcceptApplicationResponse>({
      mutation: ACCEPT_APPLICATION,
      variables: {
        id
      }
    });
  }

  rejectApplication(rejectApplicationInput: RejectApplicationInput) {
    return this.apollo.mutate<RejectApplicationResponse>({
      mutation: REJECT_APPLICATION,
      variables: {
        input: {
          ...rejectApplicationInput
        }
      }
    });
  }

  cancelApplication(id: string) {
    return this.apollo.mutate<CancelApplicationResponse>({
      mutation: CANCEL_APPLICATION,
      variables: {
        id
      }
    });
  }
}
