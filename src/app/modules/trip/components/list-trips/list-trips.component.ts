import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  currentDate = new Date();

  finderForm = this.fb.group({
    keyword: [''],
    minDate: [''],
    maxDate: [''],
    minPrice: [''],
    maxPrice: [''],
    maxItems: ['']
  });

  constructor(
    private fb: FormBuilder,
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

  findTrips() {
    this.loading = true;

    const { keyword, maxItems, minDate, maxDate, minPrice, maxPrice } =
      this.finderForm.value;

    this.tripService
      .getTrips({
        limit: maxItems || 10,
        where: {
          ...(keyword && { filter_search: keyword }),
          ...(minDate && { startDate: { gte: minDate } }),
          ...(maxDate && { endDate: { lte: maxDate } }),
          ...(minPrice && { price: { gte: minPrice } }),
          ...(maxPrice && { price: { lte: maxPrice } })
        }
      })
      .subscribe({
        next: ({ data }) => {
          console.log(data);
          this.trips = data.getTrips;
          this.loading = false;
        },
        error: (err) => {
          console.error(err.message);
          this.loading = false;
        }
      });
  }
}
