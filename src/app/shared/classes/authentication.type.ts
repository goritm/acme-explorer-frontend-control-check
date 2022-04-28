import { User } from 'src/utils/models/user.model';

export class AuthenticationType {
  private _accessToken: string;

  private _user: User;

  constructor(accessToken: string, user: User) {
    this._accessToken = accessToken;
    this._user = user;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get user(): User {
    return this._user;
  }
}
