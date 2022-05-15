import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { PAY_APPLICATION } from './graphql/mutations/pay-application.mutation';
import { PAY_SPONSORSHIP } from './graphql/mutations/pay-sponsorship.mutation';
import { PayApplicationResponse } from './graphql/responses/pay-application.response';
import { PaySponsorshipResponse } from './graphql/responses/pay-sponsorship.response';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private apollo: Apollo) {}

  payApplication(id: string) {
    return this.apollo.mutate<PayApplicationResponse>({
      mutation: PAY_APPLICATION,
      variables: {
        id
      }
    });
  }

  paySponsorship(id: string) {
    return this.apollo.mutate<PaySponsorshipResponse>({
      mutation: PAY_SPONSORSHIP,
      variables: {
        id
      }
    });
  }
}
