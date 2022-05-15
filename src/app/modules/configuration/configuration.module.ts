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
  NbListModule,
  NbSpinnerModule
} from '@nebular/theme';
import { AppRoutingModule } from '../routing/app-routing.module';
import { NgxTranslateModule } from '../translate/translate.module';
import { FlatRateComponent } from './components/flat-rate/flat-rate.component';
import { ConfigurationService } from './services/configuration.service';

@NgModule({
  declarations: [FlatRateComponent],
  imports: [
    GraphQLModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule,
    NbIconModule,
    NbListModule,
    NbCardModule,
    NbSpinnerModule,
    NgxTranslateModule
  ],
  providers: [ConfigurationService],
  exports: [FlatRateComponent]
})
export class ConfigurationModule {}
