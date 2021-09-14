import { Injectable } from '@angular/core';

import { DirectionOfStudy } from 'src/app/interfaces/direction-of-study';
import { FormOptionDataObject } from 'src/app/interfaces/form-option-data-object';

import { DIRECTIONS_OF_STUDY } from 'src/app/constants/directionsOfStudy';

@Injectable()
export class DirectionsOfStudyService {
  public createFormOptionsFromDataObject(
    directionOfStudyDataObject: DirectionOfStudy
  ): FormOptionDataObject {
    let genderFormOption: FormOptionDataObject = {
      text: directionOfStudyDataObject.title,
      value: directionOfStudyDataObject.title.toLowerCase(),
    };

    return genderFormOption;
  }

  public createFormOptions(): FormOptionDataObject[] {
    return DIRECTIONS_OF_STUDY.map((directionOfStudyDataObject) =>
      this.createFormOptionsFromDataObject(directionOfStudyDataObject)
    );
  }
}
