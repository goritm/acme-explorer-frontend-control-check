import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { STORAGE_USER } from 'src/utils/constants/user.constants';
import { IUser } from 'src/utils/interfaces/user.interface';

import { Apollo } from 'apollo-angular';
import { UpdateUserPayload } from '../graphql/inputs/update-user.payload';
import { UPDATE_SELF } from '../graphql/mutations/update-self.mutation';
import { ResponseUpdateSelfMutation } from '../graphql/types/update-self-response.type';

/**
 * Common authentication service.
 * Should be used to as an interlayer between UI Components and Auth Strategy.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<IUser>;

  constructor(private apollo: Apollo) {
    this.currentUserSubject = new BehaviorSubject<IUser>(
      JSON.parse(localStorage.getItem(STORAGE_USER) || '{}')
    );
  }

  get getCurrentUser(): Observable<IUser> {
    return this.currentUserSubject.asObservable();
  }

  saveUserData(data: ResponseUpdateSelfMutation) {
    localStorage.setItem(STORAGE_USER, JSON.stringify(data.updateSelf));
  }

  update(updateUserPayload: UpdateUserPayload) {
    return this.apollo.mutate<ResponseUpdateSelfMutation>({
      mutation: UPDATE_SELF,
      variables: {
        input: updateUserPayload
      }
    });
  }
}
