import { Component, OnInit } from '@angular/core';
import { ITrip } from '../../interfaces/trip.interface';
import { TripService } from '../../trip.service';

@Component({
  selector: 'self-trips',
  templateUrl: './self-trips.component.html',
  styleUrls: ['./self-trips.component.scss'],
  providers: [TripService]
})
export class SelfTripsComponent implements OnInit {
  trips: ITrip[] = [];
  pageSize = 10;
  placeholders: unknown = [];
  pageToLoadNext = 1;
  loading = false;

  constructor(private readonly tripService: TripService) {}

  loadNext() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.tripService.selfTrips({ limit: this.pageSize }).subscribe({
      next: ({ data }) => {
        this.placeholders = [];
        this.trips = data.getSelfTrips.data;
        this.loading = false;
        this.pageToLoadNext++;
      }
    });
  }

  ngOnInit(): void {
    this.loadNext();
  }
}
