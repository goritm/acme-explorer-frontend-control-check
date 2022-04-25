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
import { CreateTripInput } from '../../inputs/create-trip.input';

@Component({
  selector: 'create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTripComponent {
  submitted = false;
  loading = false;
  progress = 0;

  min = new Date();

  createTripForm = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(40)]
    ],
    description: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(40)]
    ],
    dates: [{}, Validators.required],
    requirements: ['', [Validators.required]],
    image: ['', [Validators.required]]
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

    console.log(this.createTripForm.value);
    const createTripInput: CreateTripInput = {
      ...this.createTripForm.value,
      startDate: this.createTripForm.value.dates.start
        .toISOString()
        .split('T')[0],
      endDate: this.createTripForm.value.dates.end.toISOString().split('T')[0],
      requirements: this.createTripForm.value.requirements.split('\n'),
      stages: [
        {
          title: 'Stage 1',
          description: 'Description of stage 1',
          price: 2500
        }
      ]
    };

    console.log(createTripInput);
    // this.tripService
    //   .createTrip(this.createTripForm.value)
    //   .pipe(
    //     finalize(() => {
    //       this.loading = false;
    //       this.cdr.detectChanges();
    //     })
    //   )
    //   .subscribe({
    //     error: (err) => {
    //       this.toastrService.show(err.message, 'Error', {
    //         duration: 3000,
    //         status: 'danger'
    //       });
    //     },
    //     complete: () => {
    //       this.router.navigate(['/']);
    //     }
    //   });
  }
}
