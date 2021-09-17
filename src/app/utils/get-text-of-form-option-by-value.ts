import { FormOption } from '../interfaces/form-option';

export function getTextOfFormOptionByValue(
  formOptions: FormOption[],
  value: string
): string | null {
  for (let formOption of formOptions) {
    if (formOption.value === value) {
      return formOption.text;
    }
  }

  return null;
}
