import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogModule,
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
import { TripService } from './trip.service';
import { ListTripsComponent } from './components/list-trips/list-trips.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { ApplyToTripDialogComponent } from './components/trip-detail/dialog/apply-to-trip-dialog/apply-to-trip-dialog.component';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { ShareModule } from 'src/app/components/share.module';
import { SelfTripsComponent } from './components/self-trips/self-trips.component';

@NgModule({
  declarations: [
    CreateTripComponent,
    ListTripsComponent,
    TripDetailComponent,
    HoverClassDirective,
    ApplyToTripDialogComponent,
    SelfTripsComponent
  ],
  imports: [
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
    NbDatepickerModule.forRoot(),
    NgxTranslateModule,
    NbDialogModule.forChild(),
    ShareModule
  ],
  providers: [NbLayoutRulerService, NbLayoutRulerService, TripService],
  exports: [
    ListTripsComponent,
    TripDetailComponent,
    CreateTripComponent,
    SelfTripsComponent
  ]
})
export class TripModule {}
