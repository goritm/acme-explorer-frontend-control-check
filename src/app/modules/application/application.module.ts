import { GraphQLModule } from './../graphql/graphql.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListApplicationsComponent } from './components/list-applications/list-applications.component';
import { NbAccordionModule, NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [ListApplicationsComponent],
  imports: [CommonModule, GraphQLModule, NbCardModule, NbAccordionModule],
  exports: [ListApplicationsComponent]
})
export class ApplicationModule {}
