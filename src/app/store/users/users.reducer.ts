import { Action, createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';

import { UsersStore } from 'src/app/interfaces/users-store';
import { User } from 'src/app/interfaces/user';

const initialStore: UsersStore = {
  users: [
    // {
    //   userName: 'Ivanov',
    //   gender: 'Male',
    //   educationDirection: 'Frontend',
    //   dateOfBirth: new Date(2014, 1, 1),
    //   educationStartDate: new Date(2020, 10, 1),
    //   educationEndDate: new Date(2021, 12, 1),
    // },
    // {
    //   userName: 'Ivanova',
    //   gender: 'Female',
    //   educationDirection: 'Backend',
    //   dateOfBirth: new Date(2014, 1, 1),
    //   educationStartDate: new Date(2020, 10, 2),
    //   educationEndDate: new Date(2021, 11, 1),
    // },
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
  ),

  on(
    UsersActions.updateUser,
    (
      store: UsersStore,
      { oldUser, updatedUser }: { oldUser: User; updatedUser: User }
    ): UsersStore => {
      let usersFromStore: User[] = [...store.users];
      let users: User[] = usersFromStore.map((userFromStore: User): User => {
        return userFromStore.userName.toLowerCase() ===
          oldUser.userName.toLowerCase()
          ? updatedUser
          : userFromStore;
      });

      return {
        ...store,
        users,
      };
    }
  )
);

export const usersReducer = (store: UsersStore | undefined, action: Action) =>
  _usersReducer(store, action);
