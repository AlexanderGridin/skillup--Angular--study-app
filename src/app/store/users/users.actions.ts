import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';

export namespace UsersActions {
  export const addUser = createAction('ADD_USER', props<{ user: User }>());
}
