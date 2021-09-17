import { FormOption } from '../interfaces/form-option';

export function getValueOfFormOptionByText(
  formOptions: FormOption[],
  text: string
): string | null {
  for (let formOption of formOptions) {
    if (formOption.text.toLowerCase() === text.toLowerCase()) {
      return formOption.value;
    }
  }

  return null;
}
