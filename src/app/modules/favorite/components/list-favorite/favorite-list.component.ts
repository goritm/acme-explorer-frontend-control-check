import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FavoriteService } from '../../services/favorite.service';
import { FavoriteList } from '../../graphql/types/favorite-list.type';
import { Trip } from 'src/app/modules/trip/graphql/types/trip.type';

@Component({
  selector: 'favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {
  favoriteList!: FavoriteList;
  count = 0;
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;

  constructor(
    protected favoriteService: FavoriteService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService
  ) {}

  removeFavoriteTrip(trip: Trip) {
    this.favoriteService
      .deleteFavoriteTrip({
        id: this.favoriteList.id,
        trip: trip.id
      })
      .subscribe({
        next: () => {
          this.toastrService.success('Trip removed from favorite list');
          setTimeout(() => {
            this.router.navigate(['/favorites']);
          }, 3000);
        }
      });
  }

  loadNext() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    if (this.loading) {
      return;
    }

    this.loading = true;
    this.favoriteService.getSelfFavoriteListById(id).subscribe({
      next: ({ data }) => {
        this.favoriteList = data.getSelfFavoriteListById;
        this.loading = false;
        this.pageToLoadNext++;
      }
    });
  }

  ngOnInit(): void {
    this.loadNext();
  }
}
