import { SponsorshipState } from './../../../sponsorship/graphql/enums/sponsorship-states.enum';
import { SponsorshipService } from './../../../sponsorship/service/sponsorship.service';
import { Sponsorship } from './../../../sponsorship/graphql/types/sponsorship.type';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { TripState } from 'src/utils/enums/trip-state.enum';
import { finalize } from 'rxjs';

@Component({
  selector: 'trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  trip: ITrip | undefined;
  sponsorship: Sponsorship | undefined;

  loading = true;
  userRole: string | undefined;
  isOwnTrip = false;
  tripIsNotCancelled = false;
  isExplorer = false;
  currentDate = new Date();

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private location: Location,
    private dialogService: NbDialogService,
    private sponsorshipService: SponsorshipService,
    private toastrService: NbToastrService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getTripDetail();
    this.userRole = this.authService.getRole();
    this.isExplorer = this.userRole === UserRoles.EXPLORER;
  }

  getTripDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tripService.getTripDetail(id).subscribe({
      next: ({ data }) => {
        if (!(data === undefined || data === null)) {
          this.trip = data.getTripById;
          this.checkOwnTrip();
          this.checkTripIsNotCancelled();
          this.getSponsorships();

          this.loading = false;
        }
      },
      error: (err: any) => {
        this.toastrService.show(err.message, 'Error', {
          duration: 3000,
          status: 'danger'
        });
      }
    });
  }

  getSponsorships(): void {
    this.loading = true;

    this.sponsorshipService
      .getSponsorships({
        where: {
          trip: this.trip?.id,
          state: SponsorshipState.ACTIVE
        }
      })
      .subscribe({
        next: ({ data }) => {
          if (!(data === undefined || data === null)) {
            const sponsorships = data.getSponsorships;
            const randomSponsorshipIndex = Math.floor(
              Math.random() * sponsorships.length
            );

            this.sponsorship = sponsorships[randomSponsorshipIndex];
            this.loading = false;
          }
        },
        error: (err: any) => {
          this.toastrService.show(err.message, 'Error', {
            duration: 3000,
            status: 'danger'
          });
          this.loading = false;
        }
      });
  }

  checkOwnTrip(): void {
    this.authService.getCurrentUser.subscribe((user) => {
      this.isOwnTrip =
        user.role === UserRoles.MANAGER && user.id === this.trip?.manager.id;
    });
  }

  checkTripIsNotCancelled(): void {
    this.tripIsNotCancelled = this.trip?.state !== TripState.CANCELLED;
  }

  goBack(): void {
    this.location.back();
  }

  openModal(): void {
    this.dialogService
      .open(ApplyToTripDialogComponent, {
        context: {
          title: 'Apply to trip',
          trip: this.trip
        }
      })
      .onClose.subscribe(() => this.getTripDetail());
  }

  editTrip(): void {
    this.dialogService
      .open(EditTripDialogComponent, {
        context: {
          title: 'Edit trip',
          trip: this.trip
        }
      })
      .onClose.subscribe(() => this.getTripDetail());
  }

  deleteTrip(): void {
    this.loading = true;

    this.tripService
      .deleteTrip(this.trip?.id ?? '')
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: ({ data }) => {
          if (!(data === undefined || data === null)) {
            this.toastrService.show('Trip deleted successfully', 'Success', {
              duration: 3000,
              status: 'success'
            });
          }
        },
        error: (err: any) => {
          this.toastrService.show(err.message, 'Error', {
            duration: 3000,
            status: 'danger'
          });
        },
        complete: () => {
          this.goBack();
        }
      });
  }

  publishTrip(): void {
    this.loading = true;

    this.tripService
      .publishTrip(this.trip?.id ?? '')
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: ({ data }) => {
          if (!(data === undefined || data === null)) {
            this.toastrService.show('Trip published!', 'Success', {
              duration: 3000,
              status: 'success'
            });
            this.getTripDetail();
          }
        },
        error: (err: any) => {
          this.toastrService.show(err.message, 'Error', {
            duration: 3000,
            status: 'danger'
          });
        }
      });
  }

  cancelTrip(): void {
    const startDate = new Date(this.trip?.startDate ?? this.currentDate);

    // If trip is already started, show error
    if (startDate < this.currentDate) {
      this.toastrService.show(
        'You cannot cancel a trip that has already started',
        'Error',
        {
          duration: 3000,
          status: 'danger'
        }
      );
      return;
    }

    // If trip is less than a week away, show warning
    const diffInDays = differenceInDays(startDate, this.currentDate);
    if (diffInDays < 7) {
      this.toastrService.show(
        'You cannot cancel a trip that is less than a week away',
        'Error',
        {
          duration: 3000,
          status: 'danger'
        }
      );

      return;
    }

    this.dialogService
      .open(CancelTripDialogComponent, {
        context: {
          title: 'Cancel trip',
          trip: this.trip
        }
      })
      .onClose.subscribe(() => this.getTripDetail());
  }
}
