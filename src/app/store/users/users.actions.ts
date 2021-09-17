import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';

export namespace UsersActions {
  export const addUser = createAction('ADD_USER', props<{ user: User }>());
  export const removeUser = createAction(
    'REMOVE_USER',
    props<{ user: User }>()
  );
  export const updateUser = createAction(
    'UPDATE_USER',
    props<{ oldUser: User; updatedUser: User }>()
  );
}
