import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NbSearchService, NbToastrService } from '@nebular/theme';
import { FinderService } from 'src/app/modules/user/services/finder.service';
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
    private finderService: FinderService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.loadNext();

    // this.searchService
    //   .onSearchSubmit()
    //   .subscribe(({ term: searchBarResult }: any) => {
    //     const filteredTrips = this.trips.filter(
    //       ({ title, description, ticket }) => {
    //         const sbResultLowerCase = searchBarResult.toLowerCase();
    //         return (
    //           title.toLowerCase().includes(sbResultLowerCase) ||
    //           description.toLowerCase().includes(sbResultLowerCase) ||
    //           ticket.toLowerCase().includes(sbResultLowerCase)
    //         );
    //       }
    //     );
    //     this.trips = filteredTrips;
    //   });
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

    const { keyword, minDate, maxDate, minPrice, maxPrice, maxItems } =
      this.finderForm.value;

    this.tripService
      .getTrips({
        limit: maxItems || 10,
        where: {
          ...(keyword && { filter_search: keyword }),
          ...(minDate && { startDate_gte: minDate }),
          ...(maxDate && { endDate_lte: maxDate }),
          ...(minPrice && { price_gte: minPrice }),
          ...(maxPrice && { price_lte: maxPrice })
        }
      })
      .subscribe({
        next: ({ data }) => {
          this.trips = data.getTrips;

          if (
            keyword === '' &&
            minDate === '' &&
            maxDate === '' &&
            minPrice === '' &&
            maxPrice === ''
          ) {
            this.toastrService.show(
              'Fill any input to save a finder',
              'Finder',
              {
                duration: 3000,
                status: 'warning'
              }
            );

            this.loading = false;
            return;
          }

          this.finderService
            .create({
              ...(keyword && { keyword }),
              ...(minDate && { minDate }),
              ...(maxDate && { maxDate }),
              ...(minPrice && { minPrice }),
              ...(maxPrice && { maxPrice })
            })
            .subscribe({
              next: () => {
                this.toastrService.show('Created finder...', 'Success', {
                  duration: 3000,
                  status: 'success'
                });
                this.loading = false;
              },
              error: () => {
                console.error('error');
                this.loading = false;
              }
            });
        },
        error: (err) => {
          console.error(err.message);
          this.loading = false;
        }
      });
  }
}
