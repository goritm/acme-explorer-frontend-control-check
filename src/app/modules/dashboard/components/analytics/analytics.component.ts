import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Analytics } from '../../graphql/types/analytics.type';
import { AnalyticsService } from '../../services/analytics.service';
import { EChartsOption } from 'echarts';
import { RatioOfApplicationGroupByState } from '../../graphql/types/ratio-of-application-group-by-state.type';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent implements OnInit {
  loading = false;
  analytics!: Analytics;

  pricePerTripOptions: EChartsOption = {};
  applicationPerTripOptions: EChartsOption = {};
  tripManagedPerManagerOptions: EChartsOption = {};
  ratioOfApplicationGroupByStateOptions: EChartsOption = {};

  constructor(
    protected analyticsService: AnalyticsService,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.analyticsService.analitycs().subscribe({
      next: ({ data }) => {
        this.loading = true;
        this.analytics = data.getAnalitycs;

        this.pricePerTripOptions = {
          tooltip: {
            trigger: 'item'
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ['Min', 'Avg', 'Std', 'Max']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [
                this.analytics.pricePerTrip.min,
                this.analytics.pricePerTrip.average,
                this.analytics.pricePerTrip.std,
                this.analytics.pricePerTrip.max
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

        this.applicationPerTripOptions = {
          tooltip: {
            trigger: 'item'
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ['Min', 'Avg', 'Std', 'Max']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [
                this.analytics.applicationPerTrip.min,
                this.analytics.applicationPerTrip.average,
                this.analytics.applicationPerTrip.std,
                this.analytics.applicationPerTrip.max
              ],
              type: 'line',
              areaStyle: {
                color: '#3498DB',
                shadowBlur: 10,
                origin: 'auto'
              }
            }
          ]
        };

        this.tripManagedPerManagerOptions = {
          tooltip: {
            trigger: 'item'
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ['Min', 'Avg', 'Std', 'Max']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [
                this.analytics.tripManagedPerManager.min,
                this.analytics.tripManagedPerManager.average,
                this.analytics.tripManagedPerManager.std,
                this.analytics.tripManagedPerManager.max
              ],
              type: 'line',
              areaStyle: {
                color: '#212F3D',
                shadowBlur: 10,
                origin: 'auto'
              }
            }
          ]
        };

        this.ratioOfApplicationGroupByStateOptions = {
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              type: 'pie',
              id: 'distribution',
              radius: ['30%', '80%'],
              roseType: 'area',
              universalTransition: true,
              itemStyle: {
                shadowBlur: 400,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              animationDurationUpdate: 1000,
              data: this.analytics.ratioOfApplicationGroupByState.map(
                (item: RatioOfApplicationGroupByState) => ({
                  value: item.ratio,
                  name: item.state
                })
              )
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
