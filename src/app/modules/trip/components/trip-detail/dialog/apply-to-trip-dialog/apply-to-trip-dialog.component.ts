import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ITrip } from 'src/app/modules/trip/interfaces/trip.interface';
import { TripService } from '../../../trip.service';

@Component({
  selector: 'app-apply-to-trip-dialog',
  templateUrl: './apply-to-trip-dialog.component.html',
  styleUrls: ['./apply-to-trip-dialog.component.scss']
})
export class ApplyToTripDialogComponent implements OnInit {
  title = '';
  trip!: ITrip;

  applicationForm = this.fb.group({
    comments: ['']
  });

  constructor(
    protected dialogRef: NbDialogRef<ApplyToTripDialogComponent>,
    private tripService: TripService,
    private fb: FormBuilder,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.title = this.dialogRef.componentRef.instance.title;
    this.trip = this.dialogRef.componentRef.instance.trip;
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit(form: FormGroup) {
    console.log(form.value.comments);
    this.tripService
      .applyToTrip(form.value.comments, this.trip.id)
      .subscribe((application) => {
        console.log(application);
        this.toastrService.show(
          `Applied successfully to trip ${this.trip.title}`,
          'Success!',
          {
            duration: 3000,
            status: 'success'
          }
        );
        this.applicationForm.reset();
        this.dialogRef.close();
      });
  }
}
