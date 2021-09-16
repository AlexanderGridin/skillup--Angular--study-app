import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AddUserFormDTO } from 'src/app/interfaces/add-user-form-dto';

@Injectable()
export class UsersService {
  public createUserFromAddUserFormDataObject(
    addUserFormDataObject: AddUserFormDTO
  ): User {
    let {
      userName,
      gender,
      dateOfBirth,
      educationDirection,
      educationStartDate,
      educationEndDate,
    } = addUserFormDataObject;

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
