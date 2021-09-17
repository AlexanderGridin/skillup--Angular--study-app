import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UsersActions } from 'src/app/store/users/users.actions';
import { UsersSelectors } from 'src/app/store/users/users.selectors';

import { User } from 'src/app/interfaces/user';

@Injectable()
export class UsersStoreService {
  constructor(private store$: Store) {}

  public getAllUsers(): Observable<User[]> {
    return this.store$.select(UsersSelectors.getAllUsers);
  }

  public addUser(user: User): void {
    this.store$.dispatch(UsersActions.addUser({ user }));
  }

  public removeUser(user: User): void {
    this.store$.dispatch(UsersActions.removeUser({ user }));
  }

  public updateUser(oldUser: User, updatedUser: User): void {
    this.store$.dispatch(UsersActions.updateUser({ oldUser, updatedUser }));
  }
}
