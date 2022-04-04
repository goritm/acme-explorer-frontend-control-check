import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { NbLoginComponent, NbRegisterComponent } from '@nebular/auth';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    component: NbLoginComponent
  },
  {
    path: 'register',
    component: NbRegisterComponent
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
