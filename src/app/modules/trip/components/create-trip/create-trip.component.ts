import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs';
import { TripService } from '../../trip.service';
import { CreateTripInput } from '../../inputs/create-trip.input';
import { ImageService } from 'src/app/components/upload/image.service';
import { Stage } from '../../graphql/types/stage.type';

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

  stages: Stage[] = [];

  createTripForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dates: [{}, Validators.required],
    requirements: ['', [Validators.required]],
    pictures: this.fb.array([]),
    stages: this.fb.group({
      title: [''],
      description: [''],
      price: ['']
    })
  });

  constructor(
    protected tripService: TripService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef,
    private imageService: ImageService
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
    if (this.stages.length > 0) {
      this.submitted = true;
      this.loading = true;

      const createTripInput: CreateTripInput = {
        ...this.createTripForm.value,
        startDate: this.createTripForm.value.dates.start
          .toISOString()
          .split('T')[0],
        endDate: this.createTripForm.value.dates.end
          .toISOString()
          .split('T')[0],
        requirements: this.createTripForm.value.requirements.split('\n'),
        stages: this.stages,
        ...(this.createTripForm.value.pictures.length === 0 && {
          pictures: [
            'https://curbo-assets.nyc3.digitaloceanspaces.com/inspection/1652699329039-59578d4f-166b-4cc7-a257-4192ab2252a0.jpeg'
          ]
        })
      };

      delete createTripInput.dates;

      this.tripService
        .createTrip(createTripInput)
        .pipe(
          finalize(() => {
            this.loading = false;
            this.cdr.detectChanges();
          })
        )
        .subscribe({
          next: ({ data }) => {
            if (!(data === undefined || data === null)) {
              this.toastrService.show('Trip saved!', 'Success', {
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
            this.router.navigate(['/trips/self']);
          }
        });
    } else {
      this.toastrService.show('Add at least one stage', 'Error', {
        duration: 3000,
        status: 'danger'
      });
    }
  }

  get imageArray(): FormArray {
    return this.createTripForm.controls['pictures'] as FormArray;
  }

  addImage() {
    this.imageArray.push(new FormControl('', [Validators.required]));
  }

  removeImage(imageIndex: number) {
    const { value } = this.imageArray.at(imageIndex);

    if (value) {
      this.imageService.deleteImage(value).subscribe({
        next: () => {
          this.toastrService.show('Deleted image', 'Success', {
            duration: 3000,
            status: 'success'
          });
        },
        error: (err) => {
          this.toastrService.show(err.message, 'Error', {
            duration: 3000,
            status: 'danger'
          });
        }
      });
    }

    this.imageArray.removeAt(imageIndex);
  }
}
