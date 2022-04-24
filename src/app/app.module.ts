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
  NbUserModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// main components
import { HomeComponent } from './components/home/home.component';

// shared components
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';

// pipes
import { LocalizedDataPipe } from '../utils/pipes/localized-data.pipe';
import { NgxTranslateModule } from './modules/translate/translate.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ApplicationModule } from './modules/application/application.module';

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
    NbIconModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({
      name: localStorage.getItem('theme') ?? 'default'
    }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbContextMenuModule,
    NbButtonModule,
    NbUserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
