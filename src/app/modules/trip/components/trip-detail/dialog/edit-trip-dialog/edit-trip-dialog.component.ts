import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs';
import { Stage } from 'src/app/modules/trip/graphql/types/stage.type';
import { UpdateTripInput } from 'src/app/modules/trip/inputs/update-trip.input';
import { ITrip } from 'src/app/modules/trip/interfaces/trip.interface';
import { TripService } from 'src/app/modules/trip/trip.service';

@Component({
  selector: 'app-edit-trip-dialog',
  templateUrl: './edit-trip-dialog.component.html',
  styleUrls: ['./edit-trip-dialog.component.scss']
})
export class EditTripDialogComponent implements OnInit {
  trip!: ITrip;

  submitted = false;
  loading = false;
  isOwnTrip = false;

  stages: Stage[] = [];

  updateTripForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    requirements: ['', [Validators.required]],
    stages: this.fb.group({
      title: [''],
      description: [''],
      price: ['']
    })
  });

  constructor(
    protected dialogRef: NbDialogRef<EditTripDialogComponent>,
    private tripService: TripService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.trip = this.dialogRef.componentRef.instance.trip;
    this.initForm();
  }

  addStage() {
    const title = this.updateTripForm.get('stages.title')?.value;
    const description = this.updateTripForm.get('stages.description')?.value;
    const price = this.updateTripForm.get('stages.price')?.value;

    if (title && description && price) {
      this.stages.push({ title, description, price });
      this.updateTripForm.get('stages.title')?.setValue('');
      this.updateTripForm.get('stages.description')?.setValue('');
      this.updateTripForm.get('stages.price')?.setValue('');
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

  updateTrip() {
    if (this.stages.length > 0) {
      this.submitted = true;
      this.loading = true;

      const updateTripInput: UpdateTripInput = {
        data: {
          ...this.updateTripForm.value,
          requirements: this.updateTripForm.value.requirements.split('\n'),
          stages: this.stages
        },
        where: {
          id: this.trip.id
        }
      };

      this.tripService
        .updateTrip(updateTripInput)
        .pipe(
          finalize(() => {
            this.loading = false;
            this.cdr.detectChanges();
          })
        )
        .subscribe({
          next: ({ data }) => {
            if (!(data === undefined || data === null)) {
              this.toastrService.success(
                `Trip ${this.trip.title} modified successfully`
              );
              this.updateTripForm.reset();
              this.dialogRef.close();
            }
          },
          error: (err) => {
            this.toastrService.danger(err.message);
          }
        });
    } else {
      this.toastrService.show('Add at least one stage', 'Error', {
        duration: 3000,
        status: 'danger'
      });
    }
  }

  initForm() {
    this.updateTripForm.patchValue({
      title: this.trip.title,
      description: this.trip.description,
      requirements: this.trip.requirements.join('\n'),
      price: this.trip.price
    });
  }

  close() {
    this.dialogRef.close();
  }
}
