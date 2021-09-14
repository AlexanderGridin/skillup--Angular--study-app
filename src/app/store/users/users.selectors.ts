import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UsersState } from 'src/app/interfaces/users-state';
import { User } from 'src/app/interfaces/user';

export namespace UsersSelectors {
  export const state = createFeatureSelector<UsersState>('users');

  export const getAllUsers = createSelector(
    state,
    (state: UsersState): User[] => state.users
  );
}
