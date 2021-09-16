import { FormOptionDataObject } from '../interfaces/form-option-data-object';

export function createDefaultFormOption(
  text: string,
  value: '' | null
): FormOptionDataObject {
  return { text, value };
}
