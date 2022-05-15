import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FilterInputParams } from 'src/utils/inputs/filter-input-params';
import { CreateSponsorshipInput } from '../graphql/inputs/create-sponsorship.input';
import { CREATE_SELF_SPONSORSHIP } from '../graphql/mutation/create-sponsorship.mutation';
import { GET_SPONSORSHIP } from '../graphql/queries/get-sponsorship-by-id.query';
import { GET_SELF_SPONSORSHIPS } from '../graphql/queries/self-sponsorships.query';
import { ResponseCreateSelfSponsorship } from '../graphql/responses/create-self-sponsorship.response';
import { ResponseGetSponsorshipByIdQuery } from '../graphql/responses/get-sponsorship-by-id.response';
import { ResponseSelfSponsorshipsQuery } from '../graphql/responses/self-sponsorships.response';

@Injectable({
  providedIn: 'root'
})
export class SponsorshipService {
  start = 0;
  limit = 10;
  where: unknown = {};
  sort: unknown = undefined;

  constructor(private apollo: Apollo) {}

  fetch(listSponsorshipsParams?: FilterInputParams) {
    if (listSponsorshipsParams) {
      const { start, limit, where, sort } = listSponsorshipsParams;
      this.start = start || this.start;
      this.limit = limit || this.limit;
      this.where = where || this.where;
      this.sort = sort || this.sort;
    }

    return this.apollo.query<ResponseSelfSponsorshipsQuery>({
      query: GET_SELF_SPONSORSHIPS,
      variables: {
        start: this.start,
        limit: this.limit,
        where: this.where,
        sort: this.sort
      }
    });
  }

  // getSponsorshipDetail(id: string | null) {
  //   // TODO: Add query logic
  // }

  createSponsorship(createSponsorshipInput: CreateSponsorshipInput) {
    return this.apollo.mutate<ResponseCreateSelfSponsorship>({
      mutation: CREATE_SELF_SPONSORSHIP,
      variables: {
        input: createSponsorshipInput
      }
    });
  }

  getSponsorshipById(id: string) {
    return this.apollo.query<ResponseGetSponsorshipByIdQuery>({
      query: GET_SPONSORSHIP,
      variables: {
        id
      }
    });
  }
}
