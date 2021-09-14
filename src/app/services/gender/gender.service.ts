import { Injectable } from '@angular/core';

import { Gender } from 'src/app/interfaces/gender';
import { GenderFormOption } from 'src/app/interfaces/gender-form-option';

import { GENDERS } from 'src/app/constants/genders';

@Injectable()
export class GenderService {
  public createGenderFormOptionFromGenderObj(gender: Gender): GenderFormOption {
    let genderFormOption: GenderFormOption = {
      text: gender.title,
      value: gender.title.toLowerCase(),
    };

    return genderFormOption;
  }

  public createFormOptionsData(): GenderFormOption[] {
    return GENDERS.map((gender) =>
      this.createGenderFormOptionFromGenderObj(gender)
    );
  }
}
