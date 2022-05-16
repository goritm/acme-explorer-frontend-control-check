import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { STORAGE_USER } from 'src/utils/constants/user.constants';
import { IUser } from 'src/utils/interfaces/user.interface';

import { Apollo } from 'apollo-angular';
import { UpdateUserPayload } from '../graphql/inputs/update-user.payload';
import { UPDATE_SELF } from '../graphql/mutations/update-self.mutation';
import { ResponseUpdateSelfMutation } from '../graphql/types/update-self-response.type';
import { FilterInputParams } from 'src/utils/inputs/filter-input-params';
import { LIST_USERS } from '../graphql/queries/list-users.query';
import { ResponseListUsersQuery } from '../graphql/types/list-users-reponse.type';
import { LOCK_USER } from '../graphql/mutations/lock-user.mutation';
import { ResponseLockUserMutation } from '../graphql/types/lock-user-response.type';
import { UNLOCK_USER } from '../graphql/mutations/unlock-user.mutation';
import { ResponseUnlockUserMutation } from '../graphql/types/unlock-user-response.type';
import { CreateUserInput } from '../graphql/inputs/create-user.input';
import { CREATE_USER } from '../graphql/mutations/create-user.mutation';
import { ResponseCreateUserMutation } from '../graphql/types/create-user-response.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<IUser>;
  start = 0;
  limit = 10;
  where: unknown = {};
  sort: unknown = {};

  constructor(private apollo: Apollo) {
    this.currentUserSubject = new BehaviorSubject<IUser>(
      JSON.parse(localStorage.getItem(STORAGE_USER) || '{}')
    );
  }

  get getCurrentUser(): Observable<IUser> {
    return this.currentUserSubject.asObservable();
  }

  listUsers(listTripsParams?: FilterInputParams) {
    if (listTripsParams) {
      const { start, limit, where } = listTripsParams;
      this.start = start || this.start;
      this.limit = limit || this.limit;
      this.where = where || this.where;
    }

    return this.apollo.query<ResponseListUsersQuery>({
      query: LIST_USERS,
      variables: {
        start: this.start,
        limit: this.limit,
        where: this.where
      }
    });
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

  create(createUserInput: CreateUserInput) {
    return this.apollo.mutate<ResponseCreateUserMutation>({
      mutation: CREATE_USER,
      variables: {
        input: createUserInput
      }
    });
  }

  lockUser(id: string) {
    return this.apollo.mutate<ResponseLockUserMutation>({
      mutation: LOCK_USER,
      variables: {
        id
      }
    });
  }

  unlockUser(id: string) {
    return this.apollo.mutate<ResponseUnlockUserMutation>({
      mutation: UNLOCK_USER,
      variables: {
        id
      }
    });
  }
}
