import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ANALITYCS } from '../graphql/queries/get-analytics.query';
import { GET_FINDER_STATS } from '../graphql/queries/get-finder-stats.query';
import { ResponseGetAnalyticsQuery } from '../graphql/types/get-analytics-response.type';
import { ResponseGetFinderStatsQuery } from '../graphql/types/get-finder-statistics-response.type';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private apollo: Apollo) {}

  analitycs() {
    return this.apollo.query<ResponseGetAnalyticsQuery>({
      query: GET_ANALITYCS
    });
  }

  finderStats() {
    return this.apollo.query<ResponseGetFinderStatsQuery>({
      query: GET_FINDER_STATS
    });
  }
}
