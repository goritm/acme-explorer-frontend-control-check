import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs';
import { UpdateFavoriteListInput } from 'src/app/modules/favorite/graphql/inputs/update-favorite-list.input';
import { FavoriteList } from 'src/app/modules/favorite/graphql/types/favorite-list.type';
import { FavoriteService } from 'src/app/modules/favorite/services/favorite.service';

@Component({
  selector: 'app-rename-favorite-list-dialog',
  templateUrl: './rename-favorite-list-dialog.component.html',
  styleUrls: ['./rename-favorite-list-dialog.component.scss']
})
export class RenameFavoriteListDialogComponent implements OnInit {
  favoriteList!: FavoriteList;

  submitted = false;
  loading = false;
  isOwnTrip = false;

  updateFavoriteListForm = this.fb.group({
    name: ['', [Validators.required]]
  });

  constructor(
    protected dialogRef: NbDialogRef<RenameFavoriteListDialogComponent>,
    private favoriteService: FavoriteService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.favoriteList = this.dialogRef.componentRef.instance.favoriteList;
    this.initForm();
  }

  renameFavoriteList() {
    this.submitted = true;
    this.loading = true;

    const updateFavoriteListInput: UpdateFavoriteListInput = {
      data: {
        ...this.updateFavoriteListForm.value
      },
      where: {
        id: this.favoriteList.id
      }
    };

    this.favoriteService
      .renameFavoriteList(updateFavoriteListInput)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: ({ data }) => {
          if (!(data === undefined || data === null)) {
            this.toastrService.success(
              `This favorite list has been rename successfully`
            );
            this.updateFavoriteListForm.reset();
            this.dialogRef.close();
          }
        },
        error: (err) => {
          this.toastrService.danger(err.message);
        }
      });
  }

  initForm() {
    this.updateFavoriteListForm.patchValue({
      name: this.favoriteList.name
    });
  }

  close() {
    this.dialogRef.close();
  }
}
