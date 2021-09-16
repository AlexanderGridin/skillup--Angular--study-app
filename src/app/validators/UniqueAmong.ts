import { ValidatorFn } from '@angular/forms';
import { compareStringsCaseInsensitive } from '../utils/compareStringsCaseInsensitive';

export function UniqueAmong<T>(data: T[], prop: keyof T): ValidatorFn {
  const validate: ValidatorFn = (control) => {
    for (let dataItem of data) {
      const isEqualStrings = compareStringsCaseInsensitive(
        String(dataItem[prop]),
        control.value as string
      );

      return isEqualStrings ? { invalidUserNameUniqueness: true } : null;
    }

    return null;
  };

  return validate;
}
