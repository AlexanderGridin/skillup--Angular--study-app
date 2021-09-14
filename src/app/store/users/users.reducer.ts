import { Action, createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';

import { UsersState } from 'src/app/interfaces/users-state';
import { User } from 'src/app/interfaces/user';

const initialState: UsersState = {
  users: [],
};

const _usersReducer = createReducer(
  initialState,
  on(
    UsersActions.addUser,
    (state: UsersState, { user }: { user: User }): UsersState => {
      const stateUsers: User[] = [...state.users];
      const updatedUsers: User[] = [...stateUsers, user];

      return {
        ...state,
        users: updatedUsers,
      };
    }
  )
);

export const usersReducer = (state: UsersState | undefined, action: Action) =>
  _usersReducer(state, action);
