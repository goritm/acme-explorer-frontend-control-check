import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  NbDialogService,
  NbSearchService,
  NbToastrService
} from '@nebular/theme';
import { FavoriteService } from '../../services/favorite.service';
import { FavoriteList } from '../../graphql/types/favorite-list.type';
import { GraphqlSortOperationEnum } from 'src/utils/enums/graphql-sort-operation.enum';
import { RenameFavoriteListDialogComponent } from './dialogs/rename-favorite-list/rename-favorite-list-dialog.component';

@Component({
  selector: 'favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  favoritesList: FavoriteList[] = [];
  count = 0;
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;

  constructor(
    protected favoriteService: FavoriteService,
    private router: Router,
    private searchService: NbSearchService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  delete(favoriteList: FavoriteList) {
    this.favoriteService.deleteFavoriteList(favoriteList.id).subscribe({
      next: () => {
        this.toastrService.success('Favorite list deleted');

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    });
  }

  rename(favoriteList: FavoriteList) {
    this.dialogService
      .open(RenameFavoriteListDialogComponent, {
        context: {
          favoriteList: favoriteList
        }
      })
      .onClose.subscribe(() => this.loadNext());
  }

  loadNext() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.favoriteService
      .selfFavoriteList({
        limit: this.pageSize,
        sort: { createdAt: GraphqlSortOperationEnum.desc }
      })
      .subscribe({
        next: ({ data }) => {
          this.favoritesList = data.selfFavoritesList;
          this.loading = false;
          this.pageToLoadNext++;
        }
      });
  }

  ngOnInit(): void {
    this.loadNext();

    this.searchService
      .onSearchSubmit()
      .subscribe(({ term: searchBarResult }: any) => {
        console.log(searchBarResult);
        this.loading = true;

        this.favoriteService
          .selfFavoriteList({
            where: {
              name_search: searchBarResult
            },
            sort: { createdAt: GraphqlSortOperationEnum.desc }
          })
          .subscribe({
            next: ({ data }) => {
              this.favoritesList = data.selfFavoritesList;
              this.loading = false;
              this.pageToLoadNext++;
            }
          });
      });
  }
}
