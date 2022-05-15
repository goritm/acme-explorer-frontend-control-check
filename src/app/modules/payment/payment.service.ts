import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { PAY_APPLICATION } from './graphql/mutations/pay-application.mutation';
import { PayApplicationResponse } from './graphql/responses/pay-application.response';

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
}
