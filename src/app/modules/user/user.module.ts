import { GraphQLModule } from '../graphql/graphql.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbInputModule,
  NbSpinnerModule
} from '@nebular/theme';
import { AppRoutingModule } from '../routing/app-routing.module';
import { UserService } from './services/user.service';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from '../authentication/services/auth.service';
import { NgxTranslateModule } from '../translate/translate.module';

@NgModule({
  declarations: [ProfileComponent],
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
    NbSpinnerModule,
    NgxTranslateModule
  ],
  providers: [UserService, AuthService],
  exports: [ProfileComponent]
})
export class UserModule {}
