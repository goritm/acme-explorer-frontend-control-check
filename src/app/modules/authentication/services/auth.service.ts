import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  STORAGE_ACCESS_TOKEN,
  STORAGE_USER_ID
} from 'src/utils/constants/user.constants';

import { Apollo } from 'apollo-angular';
import { ResponseLoginMutation } from 'src/utils/mutations/responses';
import { LOG_IN_MUTATION } from 'src/utils/mutations/mutations';

/**
 * Common authentication service.
 * Should be used to as an interlayer between UI Components and Auth Strategy.
 */
@Injectable()
export class AuthService {
  private userId: string | null = null;
  private _isAuthenticated = new BehaviorSubject(false);

  constructor(private apollo: Apollo) {}

  // Providing a observable to listen the authentication state
  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  setUserId(id: string) {
    this.userId = id;

    // Dispatching to all listeners that the user is authenticated
    this._isAuthenticated.next(true);
  }

  saveUserData(id: string, token: string) {
    localStorage.setItem(STORAGE_USER_ID, id);
    localStorage.setItem(STORAGE_ACCESS_TOKEN, token);
    this.setUserId(id);
  }

  logout() {
    // Removing user data from local storage and the service
    localStorage.removeItem(STORAGE_USER_ID);
    localStorage.removeItem(STORAGE_ACCESS_TOKEN);
    this.userId = null;

    // Dispatching to all listeners that the user is not authenticated
    this._isAuthenticated.next(false);
  }

  autoLogin() {
    const id = localStorage.getItem(STORAGE_USER_ID);

    if (id) {
      this.setUserId(id);
    }
  }

  login(email: string, password: string) {
    return this.apollo.mutate<ResponseLoginMutation>({
      mutation: LOG_IN_MUTATION,
      variables: {
        email: email,
        password: password
      }
    });
  }
}
