import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AddUserFormDataObject } from 'src/app/interfaces/add-user-form-data-object';

@Injectable()
export class UsersService {
  public createUserFromAddUserFormDataObject(
    addUserFormDataObject: AddUserFormDataObject
  ): User {
    let {
      userName,
      gender,
      dateOfBirth,
      educationDirection,
      educationStartDate,
      educationEndDate,
    } = addUserFormDataObject;

    // educationEndDate = educationEndDate === null ? ;

    return {
      userName,
      gender,
      dateOfBirth,
      educationDirection,
      educationStartDate,
      educationEndDate,
    } as User;
  }
}
