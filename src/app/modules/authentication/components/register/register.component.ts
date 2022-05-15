import { ResponseSignUpMutation } from './../../../../../utils/mutations/responses';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(40)]
    ],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    telephoneNumber: [
      '',
      [Validators.maxLength(9), Validators.pattern('^[0-9]+$')]
    ],
    address: ['']
  });
  submitted = false;
  loading = false;

  constructor(
    protected authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  saveUserDataRegister(data: ResponseSignUpMutation) {
    this.authService.saveUserDataRegister(data);
  }

  register(): void {
    this.submitted = true;
    this.loading = true;

    this.authService
      .signup(this.registerForm.value)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: ({ data }) => {
          if (!(data === undefined || data === null)) {
            this.saveUserDataRegister(data);
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
}
