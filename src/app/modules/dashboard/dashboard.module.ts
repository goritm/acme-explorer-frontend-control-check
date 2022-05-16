import { GraphQLModule } from '../graphql/graphql.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbSpinnerModule
} from '@nebular/theme';
import { AppRoutingModule } from '../routing/app-routing.module';
import { NgxTranslateModule } from '../translate/translate.module';
import { AnalyticsService } from './services/analytics.service';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { FinderStatsComponent } from './components/finder-stats/finder-stats.component';

@NgModule({
  declarations: [AnalyticsComponent, FinderStatsComponent],
  imports: [
    GraphQLModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbLayoutModule,
    NbButtonModule,
    NbSpinnerModule,
    NbIconModule,
    NbListModule,
    NbCardModule,
    NbSpinnerModule,
    NgxTranslateModule,
    NgxEchartsModule
  ],
  providers: [AnalyticsService],
  exports: [AnalyticsComponent, FinderStatsComponent]
})
export class DashboardModule {}
