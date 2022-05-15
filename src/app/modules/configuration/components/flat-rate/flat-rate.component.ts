import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs';
import { ConfigurationService } from '../../services/configuration.service';
import { UpdateConfigurationInput } from '../../graphql/inputs/update-configuration.input';
import { Configuration } from '../../graphql/types/configuration.type';

@Component({
  selector: 'flat-rate',
  templateUrl: './flat-rate.component.html',
  styleUrls: ['./flat-rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlatRateComponent implements OnInit {
  submitted = false;
  loading = false;
  validateForm = false;
  configuration!: Configuration;

  configurationForm = this.fb.group({
    flatRate: ['', [Validators.min(1), Validators.max(9999)]]
  });

  constructor(
    protected configurationService: ConfigurationService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  validate(): void {
    if (this.validateForm) {
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

    this.configurationService
      .update(updateConfigurationInput)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        error: (err: { message: string }) => {
          this.toastrService.show(err.message, 'Error', {
            duration: 3000,
            status: 'danger'
          });
        },
        complete: () => {
          this.router.navigate(['/']);
        }
      });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.configurationService.listConfigurations({}).subscribe({
      next: ({ data }) => {
        console.log(data);
        if (data.listConfigurations.count > 0) {
          this.configurationForm.patchValue({
            flatRate: data.listConfigurations.data[0].flatRate
          });
        }
      }
    });
  }
}
