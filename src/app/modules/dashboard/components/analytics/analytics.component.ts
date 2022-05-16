import { Router } from '@angular/router';
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
  ratioOfApplicationGroupByStateOptions: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    visualMap: {
      show: true,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          { value: 335, name: 'Direct' },
          { value: 310, name: 'Email' },
          { value: 274, name: 'Union Ads' },
          { value: 235, name: 'Video Ads' },
          { value: 400, name: 'Search Engine' }
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        label: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function () {
          return Math.random() * 200;
        }
      }
    ]
  };

  constructor(
    protected analyticsService: AnalyticsService,
    private router: Router,
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
              areaStyle: {}
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
              areaStyle: {}
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
              areaStyle: {}
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
