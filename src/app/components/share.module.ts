import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbSpinnerModule } from '@nebular/theme';
import { GraphQLModule } from 'src/app/modules/graphql/graphql.module';
import { NgxTranslateModule } from 'src/app/modules/translate/translate.module';
import { AppRoutingModule } from '../modules/routing/app-routing.module';
import { ProgressComponent } from './progress/progress.component';
import { FileUploadComponent } from './upload/file-upload.component';

@NgModule({
  declarations: [FileUploadComponent, ProgressComponent],
  imports: [
    GraphQLModule,
    NgxTranslateModule,
    AppRoutingModule,
    NbSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [FileUploadComponent, ProgressComponent]
})
export class ShareModule {}
