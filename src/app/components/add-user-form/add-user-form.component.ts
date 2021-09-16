import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { UsersSelectors } from 'src/app/store/users/users.selectors';

import { User } from 'src/app/interfaces/user';
import { FormOption } from '../../interfaces/form-option';
import { AddUserFormDataObject } from 'src/app/interfaces/add-user-form-data-object';

import { UsersService } from 'src/app/services/users/users.service';

import { DateEquals } from 'src/app/validators/date-equals';
import { UniqueAmong } from 'src/app/validators/unique-among';
import { DateLaterThan } from 'src/app/validators/date-later-than';
import { DateEarlierThan } from 'src/app/validators/date-earlier-than';

import { GENDERS_FORM_OPTIONS } from 'src/app/constants/genders-form-options';
import { DIRECTIONS_OF_STUDY_FORM_OPTIONS } from 'src/app/constants/directions-of-study-form-options';

import { createDefaultFormOption } from 'src/app/utils/create-default-form-option';

@Component({
  selector: 'add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css'],
})
export class AddUserFormComponent implements OnInit, OnDestroy {
  public defaultDate!: Date;

  private users!: User[];
  private getUsersSub!: Subscription;

  public form!: FormGroup;
  public genderFormOptions: FormOption[] = GENDERS_FORM_OPTIONS;
  public defaultGenderFormOption: FormOption = createDefaultFormOption(
    'Select gender',
    ''
  );

  public educationDirectionFormOptions: FormOption[] =
    DIRECTIONS_OF_STUDY_FORM_OPTIONS;
  public defaultEducationDirectionFormOption: FormOption =
    createDefaultFormOption('Select direction of study', '');

  @Output() onSubmit: EventEmitter<User> = new EventEmitter<User>();
  @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private store$: Store, private usersService: UsersService) {}

  public ngOnInit(): void {
    this.initDefaultDate();
    this.getAllUsers();
    this.initForm();
    this.setValidatorsThatRequireFormInitialization();
  }

  private initDefaultDate(): void {
    let time: number = new Date().setHours(0, 0, 0, 0);
    this.defaultDate = new Date(time);
  }

  private getAllUsers(): void {
    this.getUsersSub = this.store$
      .select(UsersSelectors.getAllUsers)
      .subscribe({
        next: (usersFromStore: User[]): void => {
          this.users = usersFromStore;
        },
      });
  }

  private initForm(): void {
    this.form = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        UniqueAmong<User>(this.users, 'userName'),
      ]),

      gender: new FormControl(this.defaultGenderFormOption.value, [
        Validators.required,
      ]),

      dateOfBirth: new FormControl(this.defaultDate),

      educationDirection: new FormControl(
        this.defaultEducationDirectionFormOption.value,
        [Validators.required]
      ),

      educationStartDate: new FormControl(this.defaultDate),

      educationEndDate: new FormControl(this.defaultDate),
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
        'EducationStartDate'
      ),
      DateLaterThan(this.form.controls.educationEndDate, 'EducationEndDate'),
      DateEquals(this.form.controls.educationStartDate, 'EducationStartDate'),
      DateEquals(this.form.controls.educationEndDate, 'EducationEndDate'),
    ]);
  }

  private setEducationStartDateFormControlValidators(): void {
    this.form.controls.educationStartDate.setValidators([
      Validators.required,
      DateEarlierThan(this.form.controls.dateOfBirth, 'DateOfBirth'),
      DateLaterThan(this.form.controls.educationEndDate, 'EducationEndDate'),
      DateEquals(this.form.controls.dateOfBirth, 'DateOfBirth'),
      DateEquals(this.form.controls.educationEndDate, 'EducationEndDate'),
    ]);
  }

  private setEducationEndDateFormControlValidatiors(): void {
    this.form.controls.educationEndDate.setValidators([
      Validators.required,
      DateEarlierThan(this.form.controls.dateOfBirth, 'DateOfBirth'),
      DateEarlierThan(
        this.form.controls.educationStartDate,
        'EducationStartDate'
      ),
      DateEquals(this.form.controls.dateOfBirth, 'DateOfBirth'),
      DateEquals(this.form.controls.educationStartDate, 'EducationStartDate'),
    ]);
  }

  public handleValueChangeOfDateOfBirth(): void {
    this.form.controls.educationStartDate.updateValueAndValidity();
    this.form.controls.educationEndDate.updateValueAndValidity();
  }

  public handleValueChangeOfEducationDirection(): null {
    this.form.controls.educationEndDate.updateValueAndValidity();

    if (this.form.controls.educationDirection.value === '') {
      return null;
    }
    if (
      this.form.controls.educationDirection.value === 'backend' ||
      this.form.controls.educationDirection.value === 'frontend'
    ) {
      this.form.controls.educationEndDate.setValidators([
        Validators.required,
        DateEarlierThan(this.form.controls.dateOfBirth, 'DateOfBirth'),
        DateEarlierThan(
          this.form.controls.educationStartDate,
          'EducationStartDate'
        ),
        DateEquals(this.form.controls.dateOfBirth, 'DateOfBirth'),
        DateEquals(this.form.controls.educationStartDate, 'EducationStartDate'),
      ]);

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
    console.log(this.form.controls);

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
    for (let controlName in this.form.controls) {
      this.form.controls[controlName].invalid &&
        this.form.controls[controlName].markAsTouched();
    }
  }

  private handleFormValidStatus(): void {
    let addUserFormDataObject: AddUserFormDataObject = this.form.value;
    let newUser: User = this.usersService.createUserFromAddUserFormDataObject(
      addUserFormDataObject
    );

    this.onSubmit.emit(newUser);
  }

  public handleCancel(event: Event): void {
    this.onCancel.emit(event);
  }

  public ngOnDestroy(): void {
    this.getUsersSub.unsubscribe();
  }
}
