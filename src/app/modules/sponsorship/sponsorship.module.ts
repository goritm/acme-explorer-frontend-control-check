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

import { ShareModule } from 'src/app/components/share.module';
import { SponsorshipService } from './sponsorship.service';

@NgModule({
  declarations: [],
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
  providers: [NbLayoutRulerService, NbLayoutRulerService, SponsorshipService],
  exports: []
})
export class SponsorshipModule {}
