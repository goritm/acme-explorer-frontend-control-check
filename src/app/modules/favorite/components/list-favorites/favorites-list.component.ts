import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
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
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  delete(favoriteList: FavoriteList) {
    this.favoriteService.deleteFavoriteList(favoriteList.id).subscribe({
      next: () => {
        this.toastrService.success('Favorite list deleted');
        this.favoritesList = this.favoritesList.filter(
          (f) => f.id !== favoriteList.id
        );
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
  }
}
