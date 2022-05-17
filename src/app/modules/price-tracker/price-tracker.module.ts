import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceTrackerComponent } from './price-tracker.component';
import { NbCardModule, NbListModule } from '@nebular/theme';

@NgModule({
  declarations: [PriceTrackerComponent],
  imports: [CommonModule, NbListModule, NbCardModule],
  exports: [PriceTrackerComponent]
})
export class PriceTrackerModule {}
