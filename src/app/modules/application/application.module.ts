import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListApplicationsComponent } from './components/list-applications/list-applications.component';

@NgModule({
  declarations: [ListApplicationsComponent],
  imports: [CommonModule],
  exports: [ListApplicationsComponent]
})
export class ApplicationModule {}
