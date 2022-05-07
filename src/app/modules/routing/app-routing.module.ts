import { ListTripsComponent } from './../trip/components/list-trips/list-trips.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../authentication/components/login/login.component';
import { RegisterComponent } from './../authentication/components/register/register.component';
import { TripDetailComponent } from '../trip/components/trip-detail/trip-detail.component';
import { CreateTripComponent } from '../trip/components/create-trip/create-trip.component';
import { ListApplicationsComponent } from '../application/components/list-applications/list-applications.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { AuthGuard } from 'src/app/modules/authentication/auth.guard';
import { UserRoles } from 'src/utils/enums/user-roles.enum';

const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  {
    path: 'trips',
    component: ListTripsComponent
  },
  {
    path: 'trips/:id',
    component: TripDetailComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRoles: [UserRoles.EXPLORER, UserRoles.MANAGER, UserRoles.ADMIN]
    }
  },
  {
    path: 'applications',
    component: ListApplicationsComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRoles: [UserRoles.MANAGER, UserRoles.ADMIN]
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRoles: [UserRoles.GUEST]
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRoles: [UserRoles.GUEST]
    }
  },
  {
    path: 'create-trip',
    component: CreateTripComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRoles: [UserRoles.MANAGER, UserRoles.ADMIN]
    }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
