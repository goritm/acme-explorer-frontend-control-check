import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs';
import { CancelTripInput } from 'src/app/modules/trip/inputs/cancel-trip.input';
import { ITrip } from 'src/app/modules/trip/interfaces/trip.interface';
import { TripService } from 'src/app/modules/trip/trip.service';

@Component({
  selector: 'app-cancel-trip-dialog',
  templateUrl: './cancel-trip-dialog.component.html',
  styleUrls: ['./cancel-trip-dialog.component.scss']
})
export class CancelTripDialogComponent implements OnInit {
  title = '';
  trip!: ITrip;
  submitted = false;
  loading = false;

  cancelTripForm = this.fb.group({
    reasonCancelled: ['', [Validators.required]]
  });

  constructor(
    protected dialogRef: NbDialogRef<CancelTripDialogComponent>,
    private tripService: TripService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.title = this.dialogRef.componentRef.instance.title;
    this.trip = this.dialogRef.componentRef.instance.trip;
  }

  close() {
    this.dialogRef.close();
  }

  cancelTrip() {
    this.submitted = true;
    this.loading = true;

    const cancelTripInput: CancelTripInput = {
      data: {
        reasonCancelled: this.cancelTripForm.value.reasonCancelled
      },
      where: {
        id: this.trip.id
      }
    };

    this.tripService
      .cancelTrip(cancelTripInput)
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
              `You have successfully applied to the trip ${this.trip.title}`
            );
            this.cancelTripForm.reset();
            this.dialogRef.close();
          }
        },
        error: (err) => {
          this.toastrService.danger(err.message);
        }
      });
  }
}
