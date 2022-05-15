import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from 'src/environments/environment';
import { ApplicationService } from '../application/application.service';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  applicationId: string | undefined;
  price: number | undefined;
  public payPalConfig?: IPayPalConfig;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private paymentService: PaymentService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.applicationId = params['applicationId'];
      this.getApplicationData();
    });

    this.initConfig();
  }

  private getApplicationData(): void {
    this.applicationService
      .getApplicationById(this.applicationId ?? '')
      .subscribe((data) => {
        console.log(data);
      });
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: environment.paypalKey,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: '9.99' // TODO: REPLACE WITH REAL VALUE
              }
            }
          ]
        },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log('Order Details: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );

        this.paymentService.payApplication(this.applicationId ?? '').subscribe({
          next: ({ data }) => {
            if (!(data === undefined || data === null)) {
              this.toastrService.success(`Thank you for your payment!.`);
              this.router.navigate(['/applications']);
            }
          },
          error: (err) => {
            this.toastrService.danger(err.message);
            console.error(err);
          }
        });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }
}
