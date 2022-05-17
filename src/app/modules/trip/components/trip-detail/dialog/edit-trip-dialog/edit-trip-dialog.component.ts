import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs';
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

  updateTripForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    requirements: ['', [Validators.required]],
    price: ['', [Validators.required]]
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

  updateTrip() {
    this.submitted = true;
    this.loading = true;

    const updateTripInput: UpdateTripInput = {
      data: {
        ...this.updateTripForm.value,
        requirements: this.updateTripForm.value.requirements.split('\n')
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
