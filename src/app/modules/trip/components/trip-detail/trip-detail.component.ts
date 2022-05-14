import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ITrip } from '../../interfaces/trip.interface';
import { TripService } from '../../trip.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ApplyToTripDialogComponent } from './dialog/apply-to-trip-dialog/apply-to-trip-dialog.component';
import { EditTripDialogComponent } from './dialog/edit-trip-dialog/edit-trip-dialog.component';
import { UserRoles } from 'src/utils/enums/user-roles.enum';
import { differenceInDays } from 'date-fns';
import { CancelTripDialogComponent } from './dialog/cancel-trip-dialog/cancel-trip-dialog.component';

@Component({
  selector: 'trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  trip: ITrip | undefined;
  userRole: string | undefined;
  isOwnTrip = false;
  isExplorer = false;
  currentDate = new Date();

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private location: Location,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getTripDetail();
    this.userRole = this.authService.getRole();
    this.isExplorer = this.userRole === UserRoles.EXPLORER;
  }

  getTripDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tripService.getTripDetail(id).subscribe(({ data }) => {
      this.trip = data.getTripById;
      this.checkOwnTrip();
    });
  }

  checkOwnTrip(): void {
    this.authService.getCurrentUser.subscribe((user) => {
      this.isOwnTrip =
        user.role === UserRoles.MANAGER && user.id === this.trip?.manager.id;
    });
  }

  goBack(): void {
    this.location.back();
  }

  openModal(): void {
    this.dialogService.open(ApplyToTripDialogComponent, {
      context: {
        title: 'Apply to trip',
        trip: this.trip
      }
    });
  }

  editTrip(): void {
    this.dialogService.open(EditTripDialogComponent, {
      context: {
        title: 'Edit trip',
        trip: this.trip
      }
    });
  }

  cancelTrip(): void {
    const startDate = new Date(this.trip?.startDate ?? this.currentDate);

    // If trip is already started, show error
    if (startDate < this.currentDate) {
      this.toastrService.danger(
        'You cannot cancel a trip that has already started'
      );
      return;
    }

    // If trip is less than a week away, show warning
    const diffInDays = differenceInDays(startDate, this.currentDate);
    if (diffInDays < 7) {
      this.toastrService.warning(
        'You cannot cancel a trip that is less than a week away'
      );
      return;
    }

    this.dialogService.open(CancelTripDialogComponent, {
      context: {
        title: 'Cancel trip',
        trip: this.trip
      }
    });
  }
}
