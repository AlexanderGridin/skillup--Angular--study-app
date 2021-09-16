import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function DateEarlierThan(
  dateControl: AbstractControl,
  dateControlName: string
): ValidatorFn {
  const validate: ValidatorFn = (control: AbstractControl) => {
    if (!control.value || !dateControl.value) {
      return null;
    }

    const dateForCheck: number = control.value.getTime();
    const targetDate: number = dateControl.value.getTime();

    const errorProp: string = `isDateEarlierThan${dateControlName}`;
    const error: ValidationErrors = {};

    if (dateForCheck < targetDate) {
      error[errorProp] = true;
      return error;
    }

    return null;
  };

  return validate;
}
