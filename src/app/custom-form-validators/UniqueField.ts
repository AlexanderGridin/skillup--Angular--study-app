import { ValidatorFn } from '@angular/forms';
import { Comparator } from '../utils/comparator';

export function UniqueField<T>(data: T[], prop: keyof T): ValidatorFn {
  const validator: ValidatorFn = (control) => {
    for (let dataItem of data) {
      if (typeof dataItem[prop] === 'string') {
        const isEqualStrings = Comparator.compareStringsCaseInsensitive(
          String(dataItem[prop]),
          control.value as string
        );

        return isEqualStrings ? { invalidUserNameUniqueness: true } : null;
      }
    }

    return null;
  };

  return validator;
}
