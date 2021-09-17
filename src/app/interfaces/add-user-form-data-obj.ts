import { FormOption } from './form-option';

export interface AddUserFormDataObj {
  userName: string;
  gender: FormOption;
  dateOfBirth: Date;
  educationDirection: FormOption;
  educationStartDate: Date;
  educationEndDate: Date | null;
}
