import { GraphQLModule } from './../graphql/graphql.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListApplicationsComponent } from './components/list-applications/list-applications.component';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSpinnerModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RejectApplicationDialogComponent } from './components/dialog/reject-application-dialog/reject-application-dialog.component';

@NgModule({
  declarations: [ListApplicationsComponent, RejectApplicationDialogComponent],
  imports: [
    CommonModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,
    NbAccordionModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbSpinnerModule,
    NbIconModule,
    NbListModule,
    NbDialogModule.forChild()
  ],
  exports: [ListApplicationsComponent]
})
export class ApplicationModule {}
