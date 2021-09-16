export interface AddUserFormDataObject {
  userName: string;
  gender: string;
  dateOfBirth: Date;
  educationDirection: string;
  educationStartDate: Date;
  educationEndDate: Date | null;
}
