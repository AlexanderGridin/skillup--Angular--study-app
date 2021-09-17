import { Injectable } from '@angular/core';

import { User } from 'src/app/interfaces/user';
import { AddUserFormDTO } from 'src/app/interfaces/add-user-form-dto';

import { capitalizeFirstLetterOfText } from 'src/app/utils/capitalize-first-letter-of-text';
import { capitalizeFirstLetterOfEachWordInText } from 'src/app/utils/capitalize-first-letter-of-each-word-in-text';
import { getTextOfFormOptionByValue } from 'src/app/utils/get-text-of-form-option-by-value';

import { EDUCATION_DIRECTION_FORM_OPTIONS } from 'src/app/constants/education-direction-form-options';
import { GENDER_FORM_OPTIONS } from 'src/app/constants/gender-form-options';
import { AddUserFormDataObj } from 'src/app/interfaces/add-user-form-data-obj';
import { getFormOptionByText } from 'src/app/utils/get-form-option-by-text';

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
      gender: getTextOfFormOptionByValue(GENDER_FORM_OPTIONS, gender),
      dateOfBirth,
      educationDirection: getTextOfFormOptionByValue(
        EDUCATION_DIRECTION_FORM_OPTIONS,
        educationDirection
      ),
      educationStartDate,
      educationEndDate,
    } as User;
  }

  public convertUserToAddUserFormDataObj(
    user: User | null | undefined
  ): AddUserFormDataObj | null {
    if (!user) {
      return null;
    }

    let {
      userName,
      gender,
      dateOfBirth,
      educationDirection,
      educationStartDate,
      educationEndDate,
    } = user;

    return {
      userName,
      gender: getFormOptionByText(GENDER_FORM_OPTIONS, gender),
      dateOfBirth,
      educationDirection: getFormOptionByText(
        EDUCATION_DIRECTION_FORM_OPTIONS,
        educationDirection
      ),
      educationStartDate,
      educationEndDate,
    } as AddUserFormDataObj;
  }
}
