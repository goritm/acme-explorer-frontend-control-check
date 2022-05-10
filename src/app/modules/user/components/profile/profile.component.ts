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
import { UserService } from '../../services/user.service';
import { UpdateUserPayload } from '../../graphql/inputs/update-user.payload';
import { IUser } from 'src/utils/interfaces/user.interface';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  submitted = false;
  loading = false;
  validateForm = false;

  updateSelfForm = this.fb.group({
    name: ['', [Validators.minLength(1), Validators.maxLength(25)]],
    lastName: ['', [Validators.minLength(1), Validators.maxLength(25)]],
    telephoneNumber: ['', [Validators.minLength(9), Validators.maxLength(11)]],
    address: ['', [Validators.minLength(5), Validators.maxLength(500)]]
  });

  constructor(
    protected userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  validate(): void {
    for (const value in this.updateSelfForm.value) {
      const field = this.updateSelfForm.value[value];
      if (field !== '') {
        this.validateForm = true;
        break;
      }
    }

    if (this.validateForm) {
      this.updateUser();
    } else {
      this.toastrService.show('An error just occurred', 'Error', {
        duration: 3000,
        status: 'danger'
      });
    }
  }

  updateUser(): void {
    this.submitted = true;
    this.loading = true;

    const updateUserPayload: UpdateUserPayload = {
      name:
        this.updateSelfForm.value.name === ''
          ? undefined
          : this.updateSelfForm.value.name,
      lastName:
        this.updateSelfForm.value.lastName === ''
          ? undefined
          : this.updateSelfForm.value.lastName,
      address:
        this.updateSelfForm.value.address === ''
          ? undefined
          : this.updateSelfForm.value.address,
      telephoneNumber:
        this.updateSelfForm.value.telephoneNumber === ''
          ? undefined
          : this.updateSelfForm.value.telephoneNumber
    };

    this.userService
      .update(updateUserPayload)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        // next: ({ data }) => {
        //   if (!(data === undefined || data === null)) {
        //     this.authService.saveUserData(data);
        //   }
        // },
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
    this.userService.getCurrentUser.subscribe((user: IUser) => {
      this.updateSelfForm.patchValue({
        name: user.name,
        lastName: user.lastName,
        telephoneNumber: user.telephoneNumber ? user.telephoneNumber : '',
        address: user.address ? user.address : ''
      });
    });
  }
}
