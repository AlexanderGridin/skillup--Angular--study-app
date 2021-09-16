import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormatSettings } from '@progress/kendo-angular-dateinputs';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { UsersSelectors } from 'src/app/store/users/users.selectors';

import { User } from 'src/app/interfaces/user';
import { FormOption } from '../../interfaces/form-option';
import { AddUserFormDTO } from 'src/app/interfaces/add-user-form-dto';

import { UsersService } from 'src/app/services/users/users.service';

import { DateEquals } from 'src/app/validators/date-equals';
import { UniqueAmong } from 'src/app/validators/unique-among';
import { DateLaterThan } from 'src/app/validators/date-later-than';
import { DateEarlierThan } from 'src/app/validators/date-earlier-than';

import { GENDER_FORM_OPTIONS } from 'src/app/constants/gender-form-options';
import { DEFAULT_DATE_FORMAT } from 'src/app/constants/default-date-format';
import { EDUCATION_DIRECTION_FORM_OPTIONS } from 'src/app/constants/education-direction-form-options';

import { getInitialCurrentDate } from 'src/app/utils/get-initial-current-date';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() initialUserName: string = '';
  @Input() initialGender: FormOption = {
    text: 'Select gender',
    value: '',
  };
  @Input() initialDateOfBirth: Date = getInitialCurrentDate();
  @Input() initialEducationDirection: FormOption = {
    text: 'Select direction of study',
    value: '',
  };
  @Input() initialEducationStartDate: Date = getInitialCurrentDate();
  @Input() initialEducationEndDate: Date = getInitialCurrentDate();

  @Input() submitButtonText: string = 'Submit';
  @Input() cancelButtonText: string = 'Cancel';

  private users!: User[];
  private getAllUsersSub!: Subscription;

  public form!: FormGroup;
  public genderFormOptions: FormOption[] = GENDER_FORM_OPTIONS;
  public educationDirectionFormOptions: FormOption[] =
    EDUCATION_DIRECTION_FORM_OPTIONS;

  private readonly DATE_OF_BIRTH_FORM_CONTROL_TITLE: string = 'DateOfBirth';
  private readonly EDUCATION_START_DATE_FORM_CONTROL_TITLE: string =
    'EducationStartDate';
  private readonly EDUCATION_END_DATE_FORM_CONTROL_TITLE: string =
    'EducationEndDate';

  public datePickerDateFormat: FormatSettings = {
    displayFormat: DEFAULT_DATE_FORMAT,
    inputFormat: DEFAULT_DATE_FORMAT,
  };

  @Output() onSubmit: EventEmitter<User> = new EventEmitter<User>();
  @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private store$: Store, private usersService: UsersService) {}

  public ngOnInit(): void {
    this.getAllUsers();
    this.initForm();
    this.setValidatorsThatRequireFormInitialization();
  }

  private getAllUsers(): void {
    this.getAllUsersSub = this.store$
      .select(UsersSelectors.getAllUsers)
      .subscribe({
        next: (usersFromStore: User[]): void => {
          this.users = usersFromStore;
        },
      });
  }

  private initForm(): void {
    this.form = new FormGroup({
      userName: new FormControl(this.initialUserName, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        UniqueAmong<User>(this.users, 'userName'),
      ]),

      gender: new FormControl(this.initialGender.value, [Validators.required]),

      dateOfBirth: new FormControl(this.initialDateOfBirth),

      educationDirection: new FormControl(
        this.initialEducationDirection.value,
        [Validators.required]
      ),

      educationStartDate: new FormControl(this.initialEducationStartDate),

      educationEndDate: new FormControl(this.initialEducationEndDate),
    });
  }

  private setValidatorsThatRequireFormInitialization(): void {
    this.setDateOfBirthFormControlValidators();
    this.setEducationStartDateFormControlValidators();
    this.setEducationEndDateFormControlValidatiors();
  }

  private setDateOfBirthFormControlValidators(): void {
    this.form.controls.dateOfBirth.setValidators([
      Validators.required,
      DateLaterThan(
        this.form.controls.educationStartDate,
        this.EDUCATION_START_DATE_FORM_CONTROL_TITLE
      ),
      DateLaterThan(
        this.form.controls.educationEndDate,
        this.EDUCATION_END_DATE_FORM_CONTROL_TITLE
      ),
      DateEquals(
        this.form.controls.educationStartDate,
        this.EDUCATION_START_DATE_FORM_CONTROL_TITLE
      ),
      DateEquals(
        this.form.controls.educationEndDate,
        this.EDUCATION_END_DATE_FORM_CONTROL_TITLE
      ),
    ]);
  }

  private setEducationStartDateFormControlValidators(): void {
    this.form.controls.educationStartDate.setValidators([
      Validators.required,
      DateEarlierThan(
        this.form.controls.dateOfBirth,
        this.DATE_OF_BIRTH_FORM_CONTROL_TITLE
      ),
      DateLaterThan(
        this.form.controls.educationEndDate,
        this.EDUCATION_END_DATE_FORM_CONTROL_TITLE
      ),
      DateEquals(
        this.form.controls.dateOfBirth,
        this.DATE_OF_BIRTH_FORM_CONTROL_TITLE
      ),
      DateEquals(
        this.form.controls.educationEndDate,
        this.EDUCATION_END_DATE_FORM_CONTROL_TITLE
      ),
    ]);
  }

  private setEducationEndDateFormControlValidatiors(): void {
    this.form.controls.educationEndDate.setValidators([
      Validators.required,
      DateEarlierThan(
        this.form.controls.dateOfBirth,
        this.DATE_OF_BIRTH_FORM_CONTROL_TITLE
      ),
      DateEarlierThan(
        this.form.controls.educationStartDate,
        this.EDUCATION_START_DATE_FORM_CONTROL_TITLE
      ),
      DateEquals(
        this.form.controls.dateOfBirth,
        this.DATE_OF_BIRTH_FORM_CONTROL_TITLE
      ),
      DateEquals(
        this.form.controls.educationStartDate,
        this.EDUCATION_START_DATE_FORM_CONTROL_TITLE
      ),
    ]);
  }

  public handleValueChangeOfDateOfBirth(): void {
    this.form.controls.educationStartDate.updateValueAndValidity();
    this.form.controls.educationEndDate.updateValueAndValidity();
  }

  public handleValueChangeOfEducationDirection(): void {
    this.setEducationEndDateValidatorsDependingOnEducationDirectionValue();
  }

  private setEducationEndDateValidatorsDependingOnEducationDirectionValue(): null {
    if (
      this.form.controls.educationDirection.value === '' ||
      this.form.controls.educationDirection.value === 'backend' ||
      this.form.controls.educationDirection.value === 'frontend'
    ) {
      this.form.controls.educationEndDate.addValidators([Validators.required]);
      this.form.controls.educationEndDate.updateValueAndValidity();

      return null;
    }

    this.form.controls.educationEndDate.removeValidators([Validators.required]);
    this.form.controls.educationEndDate.updateValueAndValidity();

    return null;
  }

  public handleValueChangeOfEducationStartDate(): void {
    this.form.controls.dateOfBirth.updateValueAndValidity();
    this.form.controls.educationEndDate.updateValueAndValidity();
  }

  public handleValueChangeOfEducationEndDate(): void {
    this.form.controls.dateOfBirth.updateValueAndValidity();
    this.form.controls.educationStartDate.updateValueAndValidity();
  }

  public handleSubmit(): null {
    if (this.form.invalid) {
      this.handleFormInvalidStatus();
      return null;
    }

    this.handleFormValidStatus();
    return null;
  }

  private handleFormInvalidStatus(): void {
    this.markAllInvalidControlsAsTouched();
  }

  private markAllInvalidControlsAsTouched(): void {
    for (let controlKey in this.form.controls) {
      this.form.controls[controlKey].invalid &&
        this.form.controls[controlKey].markAsTouched();
    }
  }

  private handleFormValidStatus(): void {
    let addUserFormDTO: AddUserFormDTO = this.form.value;
    let newUser: User =
      this.usersService.createUserFromAddUserFormDTO(addUserFormDTO);

    this.onSubmit.emit(newUser);
  }

  public handleCancel(event: Event): void {
    this.onCancel.emit(event);
  }

  public ngOnDestroy(): void {
    this.getAllUsersSub.unsubscribe();
  }
}
