import { Action, createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';

import { UsersStore } from 'src/app/interfaces/users-store';
import { User } from 'src/app/interfaces/user';

const initialStore: UsersStore = {
  users: [
    {
      userName: 'Ivanov',
      gender: 'Male',
      educationDirection: 'Frontend',
      dateOfBirth: new Date(),
      educationStartDate: new Date(),
      educationEndDate: new Date(),
    },
  ],
};

const _usersReducer = createReducer(
  initialStore,
  on(
    UsersActions.addUser,
    (store: UsersStore, { user }: { user: User }): UsersStore => {
      const usersFromStore: User[] = [...store.users];
      const users: User[] = [...usersFromStore, user];

      return {
        ...store,
        users,
      };
    }
  ),

  on(
    UsersActions.removeUser,
    (store: UsersStore, { user }: { user: User }): UsersStore => {
      const usersFromStore: User[] = [...store.users];
      const users: User[] = usersFromStore.filter(
        (userFromStore: User): boolean =>
          userFromStore.userName.toLowerCase() !== user.userName.toLowerCase()
      );

      return {
        ...store,
        users,
      };
    }
  )
);

export const usersReducer = (store: UsersStore | undefined, action: Action) =>
  _usersReducer(store, action);
