import { FormOption } from '../interfaces/form-option';

export function createDefaultFormOption(
  text: string,
  value: '' | null
): FormOption {
  return { text, value };
}
