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
  NbLayoutRulerService,
  NbListModule,
  NbSpinnerModule
} from '@nebular/theme';
import { AppRoutingModule } from '../routing/app-routing.module';
import { NgxTranslateModule } from '../translate/translate.module';

// directives
import { HoverClassDirective } from './directives/hover-class.directive';

// trips
import { TripService } from './components/trip.service';
import { ListTripsComponent } from './components/list-trips/list-trips.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';

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
    NbIconModule,
    NbSpinnerModule,
    NgxTranslateModule
  ],
  providers: [NbLayoutRulerService, NbLayoutRulerService, TripService],
  exports: [ListTripsComponent, TripDetailComponent]
})
export class TripModule {}
