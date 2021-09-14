import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

export const ValidateInputLength = (
  control: AbstractControl
): ValidationErrors | null => {
  if (control.value && control.value.length < 3) {
    return { invalidTitleLength: true };
  }

  return null;
};
