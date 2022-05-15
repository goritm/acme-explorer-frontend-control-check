import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs';
import { CreateSponsorshipInput } from '../../graphql/inputs/create-sponsorship.input';
import { SponsorshipService } from '../../service/sponsorship.service';
import { TripService } from 'src/app/modules/trip/trip.service';
import { TripState } from 'src/utils/enums/trip-state.enum';
import { Trip } from 'src/app/modules/trip/graphql/types/trip.type';

@Component({
  selector: 'create-sponsorship',
  templateUrl: './create-sponsorship.component.html',
  styleUrls: ['./create-sponsorship.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSponsorshipComponent implements OnInit {
  trips: Trip[] = [];
  submitted = false;
  loading = false;
  progress = 0;

  createSponsorshipForm = this.fb.group({
    trip: ['', [Validators.required]],
    link: [
      '',
      [Validators.required, Validators.pattern(/^(http:\/\/|https:\/\/).+$/)]
    ],
    banner: [
      '',
      [Validators.required, Validators.pattern(/^(http:\/\/|https:\/\/).+$/)]
    ]
  });

  constructor(
    private sponsorshipService: SponsorshipService,
    private tripService: TripService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  validate() {
    this.submitted = false;
    if (this.createSponsorshipForm.valid) {
      this.createSponsorship();
    } else {
      this.submitted = true;
    }
  }

  createSponsorship(): void {
    this.submitted = true;
    this.loading = true;

    const createSponsorshipInput: CreateSponsorshipInput =
      this.createSponsorshipForm.value;

    this.sponsorshipService
      .createSponsorship(createSponsorshipInput)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: ({ data }) => {
          if (!(data === undefined || data === null)) {
            this.toastrService.show('Sponsorship saved!', 'Success', {
              duration: 3000,
              status: 'success'
            });

            this.router.navigate(['/trips']);
          }
        },
        error: (err) => {
          this.toastrService.show(err.message, 'Error', {
            duration: 3000,
            status: 'danger'
          });
        },
        complete: () => {
          this.router.navigate(['/']);
        }
      });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.tripService
      .fetch({
        where: {
          state: TripState.ACTIVE
        }
      })
      .subscribe({
        next: ({ data }) => {
          this.trips = data.listTrips.data;
          this.loading = false;
        },
        error: (err) => {
          this.toastrService.show(err.message, 'Error', {
            duration: 3000,
            status: 'danger'
          });
        }
      });
  }
}
