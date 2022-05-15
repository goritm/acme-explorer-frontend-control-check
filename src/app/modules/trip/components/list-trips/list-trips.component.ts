import { Component } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { TripState } from 'src/utils/enums/trip-state.enum';
import { Trip } from '../../graphql/types/trip.type';
import { TripService } from '../../trip.service';

@Component({
  selector: 'list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.scss'],
  providers: [TripService]
})
export class ListTripsComponent {
  trips: Trip[] = [];
  pageSize = 25;
  loading = false;

  constructor(
    private tripService: TripService,
    private searchService: NbSearchService
  ) {}

  ngOnInit(): void {
    this.loadNext();

    this.searchService
      .onSearchSubmit()
      .subscribe(({ term: searchBarResult }: any) => {
        const filteredTrips = this.trips.filter(
          ({ title, description, ticket }) => {
            const sbResultLowerCase = searchBarResult.toLowerCase();
            return (
              title.toLowerCase().includes(sbResultLowerCase) ||
              description.toLowerCase().includes(sbResultLowerCase) ||
              ticket.toLowerCase().includes(sbResultLowerCase)
            );
          }
        );
        this.trips = filteredTrips;
      });
  }

  loadNext() {
    this.loading = true;
    this.tripService
      .fetch({ limit: this.pageSize, where: { state: TripState.ACTIVE } })
      .subscribe({
        next: ({ data }) => {
          this.trips = data.listTrips.data;
          this.loading = false;
        }
      });
  }
}
