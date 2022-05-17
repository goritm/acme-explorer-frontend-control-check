import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceTrackerComponent } from './price-tracker.component';

@NgModule({
  declarations: [PriceTrackerComponent],
  imports: [CommonModule],
  exports: [PriceTrackerComponent]
})
export class PriceTrackerModule {}
