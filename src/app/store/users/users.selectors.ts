import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UsersStore } from 'src/app/interfaces/users-store';
import { User } from 'src/app/interfaces/user';

export namespace UsersSelectors {
  export const store = createFeatureSelector<UsersStore>('users');

  export const getAllUsers = createSelector(
    store,
    (store: UsersStore): User[] => store.users
  );
}
