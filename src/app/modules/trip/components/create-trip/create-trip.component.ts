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

  stages: { title: string; description: string; price: number }[] = [];

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
    image: ['', [Validators.required]],
    stages: this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10000)]
      ]
    })
  });

  constructor(
    protected tripService: TripService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  addStage() {
    const title = this.createTripForm.get('stages.title')?.value;
    const description = this.createTripForm.get('stages.description')?.value;
    const price = this.createTripForm.get('stages.price')?.value;

    if (title && description && price) {
      this.stages.push({ title, description, price });
      this.createTripForm.get('stages.title')?.setValue('');
      this.createTripForm.get('stages.description')?.setValue('');
      this.createTripForm.get('stages.price')?.setValue('');
    } else {
      // this.toastrService.danger('Please fill all fields');
      this.toastrService.show('Please fill all fields', 'Error', {
        duration: 3000,
        status: 'danger'
      });
    }
  }

  deleteStage(stageToDelete: {
    title: string;
    description: string;
    price: number;
  }) {
    this.stages = this.stages.filter(
      (stage) => stage.title !== stageToDelete.title
    );
  }

  createTrip(): void {
    this.submitted = true;
    this.loading = true;

    const createTripInput: CreateTripInput = {
      ...this.createTripForm.value,
      startDate: this.createTripForm.value.dates.start
        .toISOString()
        .split('T')[0],
      endDate: this.createTripForm.value.dates.end.toISOString().split('T')[0],
      requirements: this.createTripForm.value.requirements.split('\n'),
      pictures: ['https://picsum.photos/200/300?image=10']
    };

    if (this.createTripForm.value.stages.length > 0) {
      this.tripService
        .createTrip(createTripInput)
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
    } else {
      this.toastrService.show('Agregue al menos uno csm', 'Error', {
        duration: 3000,
        status: 'danger'
      });
    }
  }
}
