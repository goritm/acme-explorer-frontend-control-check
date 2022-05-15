import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs';
import { TripService } from 'src/app/modules/trip/trip.service';
import { CreateUserInput } from '../../graphql/inputs/create-user.input';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserComponent {
  // trips: Trip[] = [];
  submitted = false;
  loading = false;
  progress = 0;

  createUserForm = this.fb.group({
    trip: ['', [Validators.required]],
    link: [
      '',
      [Validators.required, Validators.pattern(/^(http:\/\/|https:\/\/).+$/)]
    ],
    banner: [
      '',
      [Validators.required, Validators.pattern(/^(http:\/\/|https:\/\/).+$/)]
    ]
  });

  constructor(
    private userService: UserService,
    private tripService: TripService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  validate() {
    this.submitted = false;
    if (this.createUserForm.valid) {
      this.createSponsorship();
    } else {
      this.submitted = true;
    }
  }

  createSponsorship(): void {
    this.submitted = true;
    this.loading = true;

    const createUserInput: CreateUserInput = this.createUserForm.value;

    this.userService
      .create(createUserInput)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: ({ data }) => {
          if (!(data === undefined || data === null)) {
            this.toastrService.show('Sponsorship saved!', 'Success', {
              duration: 3000,
              status: 'success'
            });

            this.router.navigate(['/trips']);
          }
        },
        error: (err) => {
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
}
