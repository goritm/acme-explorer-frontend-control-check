import { Trip } from 'src/app/modules/trip/graphql/types/trip.type';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FavoriteList } from 'src/app/modules/favorite/graphql/types/favorite-list.type';
import { FavoriteService } from 'src/app/modules/favorite/services/favorite.service';

@Component({
  selector: 'app-favorite-trip-dialog',
  templateUrl: './favorite-trip-dialog.component.html',
  styleUrls: ['./favorite-trip-dialog.component.scss']
})
export class FavoriteTripDialogComponent implements OnInit {
  trip!: Trip;
  favoritesList: FavoriteList[] = [];

  favoriteTripListForm = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(
    protected dialogRef: NbDialogRef<FavoriteTripDialogComponent>,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.trip = this.dialogRef.componentRef.instance.trip;
    this.checkFavoriteLists();
  }

  close() {
    this.dialogRef.close();
  }

  checkFavoriteLists() {
    this.favoriteService.selfFavoriteList().subscribe({
      next: ({ data }) => {
        this.favoritesList = data.selfFavoritesList;
      },
      error: (err) => {
        this.toastrService.danger(err.message);
      }
    });
  }

  createFavoriteList(form: FormGroup) {
    this.favoriteService
      .createFavoriteList({
        name: form.value.name,
        trips: []
      })
      .subscribe({
        next: ({ data }) => {
          this.toastrService.success(
            `You have successfully created the favorite list ${data?.createFavoriteList.name}`
          );
          this.favoriteTripListForm.reset();
          this.checkFavoriteLists();
        },
        error: (err) => {
          this.toastrService.danger(err.message);
        }
      });
  }

  addTripToList(favoriteList: FavoriteList): void {
    this.favoriteService
      .addFavoriteTrip({
        id: favoriteList.id,
        trip: this.trip.id
      })
      .subscribe({
        next: ({ data }) => {
          this.toastrService.success(
            `You have successfully added the trip to ${data?.addFavoriteTrip.name}`
          );

          this.dialogRef.close();
        },
        error: (err) => {
          this.toastrService.danger(err.message);
        }
      });
  }
}
