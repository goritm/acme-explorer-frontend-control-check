import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs';
import { TripService } from '../../trip.service';

@Component({
  selector: 'create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTripComponent {
  submitted = false;
  loading = false;
  createTripForm = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(40)]
    ],
    description: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(40)]
    ],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    requirements: ['', [Validators.required]]
  });

  constructor(
    protected tripService: TripService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  createTrip(): void {
    this.submitted = true;
    this.loading = true;

    this.tripService
      .createTrip(this.createTripForm.value)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
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
}
