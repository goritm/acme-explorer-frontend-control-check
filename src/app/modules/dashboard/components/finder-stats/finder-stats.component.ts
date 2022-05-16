import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { AnalyticsService } from '../../services/analytics.service';
import { EChartsOption } from 'echarts';
import { FinderStats } from '../../graphql/types/finder-stats.type';

@Component({
  selector: 'finder-stats',
  templateUrl: './finder-stats.component.html',
  styleUrls: ['./finder-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinderStatsComponent implements OnInit {
  loading = false;
  analytics!: FinderStats;

  averageRangePriceOptions: EChartsOption = {};
  topKeywordsOptions: EChartsOption = {};

  constructor(
    protected analyticsService: AnalyticsService,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.analyticsService.finderStats().subscribe({
      next: ({ data }) => {
        this.loading = true;
        this.analytics = data.getAnalitycs;

        this.averageRangePriceOptions = {
          tooltip: {
            trigger: 'item'
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ['Min', 'Max']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [
                this.analytics.averageRangePrice.minPrice,
                this.analytics.averageRangePrice.maxPrice
              ],
              type: 'line',
              areaStyle: {
                color: '#1A5276',
                shadowBlur: 10,
                origin: 'auto'
              }
            }
          ]
        };

        this.topKeywordsOptions = {
          tooltip: {
            trigger: 'item'
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: [...this.analytics.topKeywords.map(({ keyword }) => keyword)]
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [...this.analytics.topKeywords.map(({ count }) => count)],
              type: 'line',
              areaStyle: {
                color: '#3498DB',
                shadowBlur: 10,
                origin: 'auto'
              }
            }
          ]
        };

        this.cdr.markForCheck();
      },
      error: (err: { message: string }) => {
        this.toastrService.show(err.message, 'Error', {
          duration: 3000,
          status: 'danger'
        });
      }
    });
  }
}
