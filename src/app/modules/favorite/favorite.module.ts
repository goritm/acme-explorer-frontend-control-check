import { GraphQLModule } from '../graphql/graphql.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSpinnerModule
} from '@nebular/theme';
import { AppRoutingModule } from '../routing/app-routing.module';
import { NgxTranslateModule } from '../translate/translate.module';
import { FavoritesListComponent } from './components/list-favorites/favorites-list.component';
import { FavoriteService } from './services/favorite.service';
import { RenameFavoriteListDialogComponent } from './components/list-favorites/dialogs/rename-favorite-list/rename-favorite-list-dialog.component';
import { FavoriteListComponent } from './components/list-favorite/favorite-list.component';

@NgModule({
  declarations: [
    FavoritesListComponent,
    RenameFavoriteListDialogComponent,
    FavoriteListComponent
  ],
  imports: [
    GraphQLModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbButtonModule,
    NbDialogModule.forChild(),
    NbSpinnerModule,
    NbIconModule,
    NbListModule,
    NbCardModule,
    NbSpinnerModule,
    NgxTranslateModule
  ],
  providers: [FavoriteService],
  exports: [
    FavoritesListComponent,
    RenameFavoriteListDialogComponent,
    FavoriteListComponent
  ]
})
export class FavoriteModule {}
