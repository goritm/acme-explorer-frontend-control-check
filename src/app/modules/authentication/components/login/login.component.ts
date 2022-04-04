import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResponseLoginMutation } from 'src/utils/mutations/responses';
import { AuthService } from '../../services/auth.service';
import { Apollo } from 'apollo-angular';
import { LOG_IN_MUTATION } from 'src/utils/mutations/mutations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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

  constructor(protected authService: AuthService, private apollo: Apollo) {}

  login(): void {
    this.apollo
      .mutate<ResponseLoginMutation>({
        mutation: LOG_IN_MUTATION,
        variables: {
          email: this.user.email,
          password: this.user.password
        }
      })
      .subscribe(({ data }) => {
        console.log(data?.signInUser);

        if (data === undefined || data === null) {
          this.errors.push('Error');
        } else {
          this.saveUserData(
            data.signInUser.user.id,
            data.signInUser.accessToken
          );
        }
      });
  }

  saveUserData(id: string, token: string) {
    this.authService.saveUserData(id, token);
  }
}
