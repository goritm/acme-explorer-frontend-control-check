import { Component } from '@angular/core';
import { ITrip } from '../../interfaces/trip.interface';
import { ListTripsService } from './list-trips.service';

@Component({
  selector: 'list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.scss'],
  providers: [ListTripsService]
})
export class ListTripsComponent {
  trips: ITrip[] = [];
  placeholders: any = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;

  constructor(private listTripsService: ListTripsService) {}

  loadNext() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.listTripsService.fetch().subscribe({
      next: ({ data }) => {
        this.trips = data.listTrips.data;
        //[...this.trips, ...data.listTrips.data];
        this.pageToLoadNext++;
        this.loading = false;
      }
    });
  }
}
