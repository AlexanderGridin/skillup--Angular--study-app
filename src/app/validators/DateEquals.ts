import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function DateEquals(
  dateControl: AbstractControl,
  dateControlName: string
): ValidatorFn {
  const validate: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const dateForCheck: number = control.value.getTime();
    const targetDate: number = dateControl.value.getTime();

    let errorProp: string = `isDateEquals${dateControlName}`;
    const error: ValidationErrors = {};

    if (dateForCheck === targetDate) {
      error[errorProp] = true;

      return error;
    }

    return null;
  };

  return validate;
}
