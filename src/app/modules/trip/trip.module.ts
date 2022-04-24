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
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { HoverClassDirective } from './directives/hover-class.directive';

@NgModule({
  declarations: [ListTripsComponent, TripDetailComponent, HoverClassDirective],
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
  exports: [ListTripsComponent, TripDetailComponent]
})
export class TripModule {}
