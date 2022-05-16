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
  pageSize = 25;
  loading = false;

  constructor(private readonly tripService: TripService) {}

  ngOnInit(): void {
    this.loadNext();
  }

  loadNext() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.tripService.selfTrips({ limit: this.pageSize }).subscribe({
      next: ({ data }) => {
        this.trips = data.getSelfTrips.data;
        this.loading = false;
      }
    });
  }
}
