import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ANALITYCS } from '../graphql/queries/get-analytics.query';
import { ResponseGetAnalyticsQuery } from '../graphql/types/get-analytics-response.type';

@Injectable({
  providedIn: 'root'
})
export class AnalitycsService {
  constructor(private apollo: Apollo) {}

  analitycs() {
    return this.apollo.query<ResponseGetAnalyticsQuery>({
      query: GET_ANALITYCS
    });
  }
}
