import { PriceTrackerModule } from './modules/price-tracker/price-tracker.module';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// nebular modules
import {
  NbThemeModule,
  NbLayoutModule,
  NbContextMenuModule,
  NbIconModule,
  NbMenuModule,
  NbButtonModule,
  NbUserModule,
  NbToastrModule,
  NbActionsModule,
  NbSearchModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// shared components
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

// i18n
import { LocalizedDataPipe } from '../utils/pipes/localized-data.pipe';
import { NgxTranslateModule } from './modules/translate/translate.module';

// custom modules
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { TripModule } from './modules/trip/trip.module';
import { ApplicationModule } from './modules/application/application.module';
import { ShareModule } from './components/share.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserModule } from './modules/user/user.module';
import { SponsorshipModule } from './modules/sponsorship/sponsorship.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { FavoriteModule } from './modules/favorite/favorite.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    LocalizedDataPipe
  ],
  imports: [
    ApplicationModule,
    AuthenticationModule,
    ConfigurationModule,
    DashboardModule,
    FavoriteModule,
    PriceTrackerModule,
    ShareModule,
    UserModule,
    PaymentModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxTranslateModule,
    TripModule,
    SponsorshipModule,
    NbIconModule,
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({
      name: localStorage.getItem('theme') ?? 'default'
    }),
    NbToastrModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbContextMenuModule,
    NbButtonModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts') // or import('./path-to-my-custom-echarts')
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
