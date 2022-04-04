import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResponseLoginMutation } from 'src/utils/mutations/responses';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  showMessages = {};
  errors: string[] = [];
  messages: string[] = [];
  submitted = false;
  rememberMe = false;
  redirectDelay = 0;
  user = {
    email: '',
    password: ''
  };

  constructor(protected authService: AuthService) {}

  saveUserData(data: ResponseLoginMutation) {
    this.authService.saveUserData(data);
  }

  login(): void {
    this.authService.login(this.user.email, this.user.password).subscribe(
      ({ data }) => {
        if (!(data === undefined || data === null)) {
          this.saveUserData(data);
        }
      },
      (error) => {
        this.errors.push('Error');
        console.error(error);
      }
    );
  }
}
