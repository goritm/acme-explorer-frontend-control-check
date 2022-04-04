import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbInputModule
} from '@nebular/theme';
import { AppRoutingModule } from '../routing/app-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule
  ],
  providers: [AuthService],
  exports: [LoginComponent, RegisterComponent]
})
export class AuthenticationModule {}
