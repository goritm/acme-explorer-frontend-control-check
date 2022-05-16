import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs';
import { CreateUserInput } from '../../graphql/inputs/create-user.input';
import { UserService } from '../../services/user.service';
import { UserRoles } from 'src/utils/enums/user-roles.enum';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserComponent {
  submitted = false;
  loading = false;
  progress = 0;
  selectedItem = UserRoles.EXPLORER;

  createUserForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(25)]
    ],
    lastName: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(25)]
    ],
    role: [UserRoles.EXPLORER],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(25)]
    ]
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  validate() {
    this.submitted = false;
    if (this.createUserForm.valid) {
      this.createUser();
    } else {
      this.submitted = true;
    }
  }

  createUser(): void {
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
        error: (err) => {
          this.toastrService.show(err.message, 'Error', {
            duration: 3000,
            status: 'danger'
          });
        },
        complete: () => {
          this.toastrService.show('User Created!', 'Success', {
            duration: 3000,
            status: 'success'
          });

          this.router.navigate(['/']);
        }
      });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
