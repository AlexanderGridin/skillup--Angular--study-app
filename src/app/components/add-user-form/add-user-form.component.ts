import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormOptionDataObject } from '../../interfaces/form-option-data-object';

import { User } from 'src/app/interfaces/user';
import { AddUserFormDataObject } from 'src/app/interfaces/add-user-form-data-object';
import { UsersService } from 'src/app/services/users/users.service';
import { Store } from '@ngrx/store';
import { UsersSelectors } from 'src/app/store/users/users.selectors';

import { UniqueAmong } from 'src/app/validators/UniqueAmong';
import { DateEarlierThan } from 'src/app/validators/DateEarlierThan';
import { DateLaterThan } from 'src/app/validators/DateLaterThan';
import { DateEquals } from 'src/app/validators/DateEquals';

import { GENDERS } from 'src/app/constants/genders';
import { DIRECTIONS_OF_STUDY } from 'src/app/constants/directionsOfStudy';
import { Subscription } from 'rxjs';
import { createDefaultFormOption } from 'src/app/utils/createDefaultFormOption';

@Component({
  selector: 'add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css'],
})
export class AddUserFormComponent implements OnInit, OnDestroy {
  private users!: User[];
  private getUsersSub!: Subscription;
  public form!: FormGroup;
  public currentDate!: Date;

  public genderFormOptions: FormOptionDataObject[] = GENDERS;
  public defaultGenderFormOption: FormOptionDataObject =
    createDefaultFormOption('Select gender', '');

  public educationDirectionFormOptions: FormOptionDataObject[] =
    DIRECTIONS_OF_STUDY;
  public defaultEducationDirectionFormOption: FormOptionDataObject =
    createDefaultFormOption('Select direction of study', '');

  @Output() onSubmit: EventEmitter<User> = new EventEmitter<User>();
  @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private store$: Store, private usersService: UsersService) {}

  public ngOnInit(): void {
    this.initCurrentDate();
    this.getAllUsers();
    this.initForm();
    this.setValidatorsThatRequireFormInitialization();
  }

  private initCurrentDate(): void {
    let time: number = new Date().setHours(0, 0, 0, 0);
    this.currentDate = new Date(time);
    console.log(this.currentDate);
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
      dateOfBirth: new FormControl(this.currentDate),
      educationDirection: new FormControl(
        this.defaultEducationDirectionFormOption.value,
        [Validators.required]
      ),
      educationStartDate: new FormControl(this.currentDate),
      educationEndDate: new FormControl(this.currentDate),
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
    this.resetForm();
  }

  private resetForm(): void {
    this.form.controls.userName.reset('');
  }

  public handleCancel(event: Event): void {
    this.onCancel.emit(event);
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
    console.log(this.form.controls.educationStartDate);

    this.form.controls.dateOfBirth.updateValueAndValidity();
    this.form.controls.educationEndDate.updateValueAndValidity();
  }

  public handleValueChangeOfEducationEndDate(): void {
    this.form.controls.dateOfBirth.updateValueAndValidity();
    this.form.controls.educationStartDate.updateValueAndValidity();
  }

  public ngOnDestroy(): void {
    this.getUsersSub.unsubscribe();
  }
}
