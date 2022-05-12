import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FilterInputParams } from 'src/utils/inputs/filter-input-params';
import { CreateSponsorshipInput } from './graphql/inputs/create-sponsorship.input';

@Injectable({
  providedIn: 'root'
})
export class SponsorshipService {
  start = 0;
  limit = 10;
  where: unknown = {};

  constructor(private apollo: Apollo) {}

  fetch(listSponsorshipsParams?: FilterInputParams) {
    if (listSponsorshipsParams) {
      const { start, limit, where } = listSponsorshipsParams;
      this.start = start || this.start;
      this.limit = limit || this.limit;
      this.where = where || this.where;
    }

    // TODO: Add query logic
  }

  getSponsorshipDetail(id: string | null) {
    // TODO: Add query logic
  }

  createSponsorship(createSponsorshipInput: CreateSponsorshipInput) {
    // TODO: Add mutation logic
  }
}
