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
  NbSidebarModule,
  NbMenuModule,
  NbButtonModule,
  NbUserModule,
  NbToastrModule
} from '@nebular/theme';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// main components
import { HomeComponent } from './components/home/home.component';

// shared components
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';

// i18n
import { LocalizedDataPipe } from '../utils/pipes/localized-data.pipe';
import { NgxTranslateModule } from './modules/translate/translate.module';

// custom modules
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { TripModule } from './modules/trip/trip.module';
import { ApplicationModule } from './modules/application/application.module';
import { RoleService } from './modules/authentication/services/role.service';

const roleConfig = {
  accessControl: {
    guest: {
      view: ['trips']
    },
    explorer: {
      parent: 'guest',
      view: ['applications'],
      create: 'applications'
    },
    manager: {
      parent: 'explorer',
      create: 'trips'
    },
    admin: {
      parent: 'manager',
      create: '*',
      remove: '*'
    }
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LocalizedDataPipe
  ],
  imports: [
    ApplicationModule,
    AuthenticationModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxTranslateModule,
    TripModule,
    NbIconModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({
      name: localStorage.getItem('theme') ?? 'default'
    }),
    NbSecurityModule.forRoot(roleConfig),
    NbToastrModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbContextMenuModule,
    NbButtonModule,
    NbUserModule
  ],
  providers: [
    {
      provide: NbRoleProvider,
      useClass: RoleService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
