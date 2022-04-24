import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../../components/home/home.component';

import { LoginComponent } from '../authentication/components/login/login.component';
import { RegisterComponent } from './../authentication/components/register/register.component';
import { ApplicationsComponent } from 'src/app/components/applications/applications.component';

const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  {
    path: 'trips',
    component: HomeComponent
  },
  {
    path: 'applications',
    component: ApplicationsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: '**', redirectTo: 'trips' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
