import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function DateLaterThan(
  dateControl: AbstractControl,
  dateControlName: string
): ValidatorFn {
  const validate: ValidatorFn = (control: AbstractControl) => {
    if (!control.value || !dateControl.value) {
      return null;
    }

    const dateForCheck: number = control.value.getTime();
    const targetDate: number = dateControl.value.getTime();

    let errorProp: string = `isDateLaterThan${dateControlName}`;
    const error: ValidationErrors = {};

    if (dateForCheck > targetDate) {
      error[errorProp] = true;

      return error;
    }

    return null;
  };

  return validate;
}
