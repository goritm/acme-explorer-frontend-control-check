import { ChangeDetectionStrategy, Component } from '@angular/core';
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

  saveUserData(id: string, token: string) {
    this.authService.saveUserData(id, token);
  }

  login(): void {
    this.authService.login(this.user.email, this.user.password).subscribe(
      ({ data }) => {
        console.log(data?.signInUser);
        if (!(data === undefined || data === null)) {
          this.saveUserData(
            data.signInUser.user.id,
            data.signInUser.accessToken
          );
        }
      },
      (error) => {
        this.errors.push('Error');
        console.error(error);
      }
    );
  }
}
