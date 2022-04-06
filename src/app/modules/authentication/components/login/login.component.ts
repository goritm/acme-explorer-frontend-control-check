import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResponseLoginMutation } from 'src/utils/mutations/responses';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(40)]
    ]
  });
  submitted = false;
  errors: string[] = [];

  constructor(
    protected authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  saveUserData(data: ResponseLoginMutation) {
    this.authService.saveUserData(data);
  }

  login(): void {
    this.submitted = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: ({ data }) => {
        if (!(data === undefined || data === null)) {
          this.saveUserData(data);
        }
      },
      error: (err) => {
        console.error(err);
        this.errors.push(err);
      },
      complete: () => {
        this.router.navigate(['/']);
      }
    });
  }
}
