import { FormOption } from '../interfaces/form-option';

export function getFormOptionByText(
  formOptions: FormOption[],
  text: string
): FormOption | null {
  for (let formOption of formOptions) {
    if (formOption.text.toLowerCase() === text.toLowerCase()) {
      return formOption;
    }
  }

  return null;
}
