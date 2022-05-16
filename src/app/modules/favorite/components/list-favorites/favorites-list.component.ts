import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { FavoriteService } from '../../services/favorite.service';
import { Configuration } from 'src/app/modules/configuration/graphql/types/configuration.type';

@Component({
  selector: 'favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesListComponent implements OnInit {
  submitted = false;
  loading = false;
  configuration!: Configuration;

  configurationForm = this.fb.group({
    flatRate: ['', [Validators.min(1), Validators.max(9999)]]
  });

  constructor(
    protected favoriteService: FavoriteService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  validate(): void {
    if (
      this.configurationForm.value.flatRate >= 1 &&
      this.configurationForm.value.flatRate <= 9999
    ) {
      this.updateConfiguration();
    } else {
      this.toastrService.show('An error just occurred', 'Error', {
        duration: 3000,
        status: 'danger'
      });
    }
  }

  updateConfiguration(): void {
    this.submitted = true;
    this.loading = true;

    const updateConfigurationInput: UpdateConfigurationInput = {
      where: {
        id: this.configuration.id
      },
      data: {
        flatRate: this.configurationForm.value.flatRate
      }
    };

    // this.favoriteService
    //   .update(updateConfigurationInput)
    //   .pipe(
    //     finalize(() => {
    //       this.loading = false;
    //       this.cdr.detectChanges();
    //     })
    //   )
    //   .subscribe({
    //     error: (err: { message: string }) => {
    //       this.toastrService.show(err.message, 'Error', {
    //         duration: 3000,
    //         status: 'danger'
    //       });
    //     },
    //     complete: () => {
    //       this.toastrService.success('Configuration updated successfully');
    //     }
    //   });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    // this.configurationService.listConfigurations({}).subscribe({
    //   next: ({ data }) => {
    //     if (data.listConfigurations.count > 0) {
    //       this.configurationForm.patchValue({
    //         flatRate: data.listConfigurations.data[0].flatRate
    //       });
    //       this.configuration = data.listConfigurations.data[0];
    //     }
    //   },
    //   error: (err: { message: string }) => {
    //     this.toastrService.show(err.message, 'Error', {
    //       duration: 3000,
    //       status: 'danger'
    //     });
    //   }
    // });
  }
}
