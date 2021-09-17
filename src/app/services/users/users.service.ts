import { Injectable } from '@angular/core';

import { User } from 'src/app/interfaces/user';
import { AddUserFormDTO } from 'src/app/interfaces/add-user-form-dto';

import { capitalizeFirstLetterOfText } from 'src/app/utils/capitalize-first-letter-of-text';
import { capitalizeFirstLetterOfEachWordInText } from 'src/app/utils/capitalize-first-letter-of-each-word-in-text';
import { getTextOfFormOptionByValue } from 'src/app/utils/get-text-of-form-option-by-value';

import { EDUCATION_DIRECTION_FORM_OPTIONS } from 'src/app/constants/education-direction-form-options';

@Injectable()
export class UsersService {
  public createUserFromAddUserFormDTO(
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
      userName: capitalizeFirstLetterOfEachWordInText(userName),
      gender: capitalizeFirstLetterOfText(gender),
      dateOfBirth,
      educationDirection: getTextOfFormOptionByValue(
        EDUCATION_DIRECTION_FORM_OPTIONS,
        educationDirection
      ),
      educationStartDate,
      educationEndDate,
    } as User;
  }
}
