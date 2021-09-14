import { Injectable } from '@angular/core';
import { GENDERS } from 'src/app/constants/genders';
import { FormOptionDataObject } from 'src/app/interfaces/form-option-data-object';
import { Gender } from 'src/app/interfaces/gender';

@Injectable({
  providedIn: 'root',
})
export class GendersService {
  public createGenderFormOptionFromGenderObj(
    gender: Gender
  ): FormOptionDataObject {
    let genderFormOption: FormOptionDataObject = {
      text: gender.title,
      value: gender.title.toLowerCase(),
    };

    return genderFormOption;
  }

  public createFormOptions(): FormOptionDataObject[] {
    return GENDERS.map((gender) =>
      this.createGenderFormOptionFromGenderObj(gender)
    );
  }
}
