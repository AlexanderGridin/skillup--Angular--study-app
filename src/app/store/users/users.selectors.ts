import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UsersStore } from 'src/app/interfaces/users-store';
import { User } from 'src/app/interfaces/user';

export namespace UsersSelectors {
  export const store = createFeatureSelector<UsersStore>('users');

  export const getAllUsers = createSelector(
    store,
    (store: UsersStore): User[] => store.users
  );

  export const getAllUsersExcluding = (userName: string | undefined) =>
    createSelector(store, (store: UsersStore): User[] => {
      if (!userName) {
        return store.users;
      }

      let usersFromStore = [...store.users];
      return usersFromStore.filter(
        (userFromStore: User): boolean =>
          userFromStore.userName.toLowerCase() !== userName.toLowerCase()
      );
    });
}
