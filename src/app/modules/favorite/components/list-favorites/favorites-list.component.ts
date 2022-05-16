import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FavoriteService } from '../../services/favorite.service';
import { FavoriteList } from '../../graphql/types/favorite-list.type';
import { GraphqlSortOperationEnum } from 'src/utils/enums/graphql-sort-operation.enum';

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
    private toastrService: NbToastrService
  ) {}

  cancel() {
    this.router.navigate(['/']);
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
