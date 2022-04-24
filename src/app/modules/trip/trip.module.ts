import { GraphQLModule } from '../graphql/graphql.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbInputModule,
  NbLayoutRulerService,
  NbListModule
} from '@nebular/theme';
import { AppRoutingModule } from '../routing/app-routing.module';
import { ListTripsComponent } from './components/list-trips/list-trips.component';
import { ListTripsService } from './components/list-trips/list-trips.service';
import { NgxTranslateModule } from '../translate/translate.module';

@NgModule({
  declarations: [ListTripsComponent],
  imports: [
    GraphQLModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    NgxTranslateModule
  ],
  providers: [NbLayoutRulerService, NbLayoutRulerService, ListTripsService],
  exports: [ListTripsComponent]
})
export class TripModule {}
