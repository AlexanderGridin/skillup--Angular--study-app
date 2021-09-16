export interface AddUserFormDTO {
  userName: string;
  gender: string;
  dateOfBirth: Date;
  educationDirection: string;
  educationStartDate: Date;
  educationEndDate: Date | null;
}
