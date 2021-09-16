import { FormOption } from '../interfaces/form-option';

export function createFormOption(text: string, value: '' | null): FormOption {
  return { text, value };
}
