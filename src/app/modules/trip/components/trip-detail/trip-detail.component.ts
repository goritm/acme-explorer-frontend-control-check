import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ITrip } from '../../interfaces/trip.interface';
import { TripService } from '../trip.service';
import { NbDialogService } from '@nebular/theme';
import { ApplyToTripDialogComponent } from './dialog/apply-to-trip-dialog/apply-to-trip-dialog.component';

@Component({
  selector: 'trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  trip: ITrip | undefined;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private location: Location,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.getTripDetail();
  }

  getTripDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tripService
      .getTripDetail(id)
      .subscribe(({ data }) => (this.trip = data.getTripById));
  }

  goBack(): void {
    this.location.back();
  }

  openModal(): void {
    this.dialogService.open(ApplyToTripDialogComponent, {
      context: {
        title: 'Apply to trip!',
        trip: this.trip
      }
    });
  }
}
