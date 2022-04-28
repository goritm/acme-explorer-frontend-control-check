import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  STORAGE_ACCESS_TOKEN,
  STORAGE_USER,
  STORAGE_USER_ID
} from 'src/utils/constants/user.constants';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { BaseUserInput, ExtendedUserInput } from 'src/utils/types/user.type';

import { Apollo } from 'apollo-angular';
import {
  ResponseLoginMutation,
  ResponseSignUpMutation
} from 'src/utils/mutations/responses';
import {
  LOG_IN_MUTATION,
  SIGN_UP_MUTATION
} from 'src/utils/mutations/mutations';

/**
 * Common authentication service.
 * Should be used to as an interlayer between UI Components and Auth Strategy.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string | null = null;
  private _isAuthenticated = new BehaviorSubject(false);
  private currentUserSubject: BehaviorSubject<IUser>;

  constructor(private apollo: Apollo) {
    this.currentUserSubject = new BehaviorSubject<IUser>(
      JSON.parse(localStorage.getItem(STORAGE_USER) || '{}')
    );
  }

  get getCurrentUser(): Observable<IUser> {
    return this.currentUserSubject.asObservable();
  }

  // Providing a observable to listen the authentication state
  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  setUserId(id: string) {
    this.userId = id;

    // Dispatching to all listeners that the user is authenticated
    this._isAuthenticated.next(true);
  }

  setUser(user: IUser) {
    this.userId = user.id;

    this._isAuthenticated.next(true);
    this.currentUserSubject.next(user);
  }

  autoLogin() {
    const id = localStorage.getItem(STORAGE_USER_ID);

    if (id) {
      this.setUserId(id);
    }
  }

  login(user: BaseUserInput) {
    const { email, password } = user;
    return this.apollo.mutate<ResponseLoginMutation>({
      mutation: LOG_IN_MUTATION,
      variables: {
        email,
        password
      }
    });
  }

  signup(user: ExtendedUserInput) {
    const { email, password, name, lastName, telephoneNumber, address } = user;

    return this.apollo.mutate<ResponseSignUpMutation>({
      mutation: SIGN_UP_MUTATION,
      variables: {
        email,
        password,
        name,
        lastName,
        ...(telephoneNumber && { telephoneNumber }),
        ...(address && { address })
      }
    });
  }

  saveUserData(data: ResponseLoginMutation) {
    const { accessToken, user } = data.signInUser;

    localStorage.setItem(STORAGE_USER_ID, user.id);
    localStorage.setItem(STORAGE_ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_USER, JSON.stringify(user));
    this.setUser(user);
  }

  saveUserDataRegister(data: ResponseSignUpMutation) {
    const { accessToken, user } = data.signUpUser;

    localStorage.setItem(STORAGE_USER_ID, user.id);
    localStorage.setItem(STORAGE_ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_USER, JSON.stringify(user));
    this.setUser(user);
  }

  logout() {
    // Removing user data from local storage and the service
    localStorage.removeItem(STORAGE_USER_ID);
    localStorage.removeItem(STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_USER);
    this.userId = null;

    // Dispatching to all listeners that the user is not authenticated
    this._isAuthenticated.next(false);

    // Reset the store after logout logic
    this.apollo.client.resetStore();
  }
}
