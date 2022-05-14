import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutRulerService,
  NbListModule,
  NbSelectModule,
  NbSpinnerModule
} from '@nebular/theme';
import { AppRoutingModule } from '../routing/app-routing.module';
import { NgxTranslateModule } from '../translate/translate.module';
import { ShareModule } from 'src/app/components/share.module';
import { SponsorshipService } from './sponsorship.service';
import { TripModule } from '../trip/trip.module';
import { CreateSponsorshipComponent } from './components/create-sponsorship/create-sponsorship.component';

@NgModule({
  declarations: [CreateSponsorshipComponent],
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
    NbSelectModule,
    NbDialogModule.forChild(),
    NgxTranslateModule,
    ShareModule,
    TripModule
  ],
  providers: [NbLayoutRulerService, NbLayoutRulerService, SponsorshipService],
  exports: [CreateSponsorshipComponent]
})
export class SponsorshipModule {}
