import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormOptionDataObject } from '../../interfaces/form-option-data-object';

import { User } from 'src/app/interfaces/user';
import { AddUserFormDataObject } from 'src/app/interfaces/add-user-form-data-object';
import { UsersService } from 'src/app/services/users/users.service';
import { Store } from '@ngrx/store';
import { UsersSelectors } from 'src/app/store/users/users.selectors';

import { UniqueAmong } from 'src/app/validators/UniqueAmong';
import { DateEarlierThan } from 'src/app/validators/EarlierThanOrEquals';
import { DateLaterThan } from 'src/app/validators/LaterThanOrEquals';
import { DateEquals } from 'src/app/validators/DateEquals';

import { GENDERS } from 'src/app/constants/genders';
import { DIRECTIONS_OF_STUDY } from 'src/app/constants/directionsOfStudy';

@Component({
  selector: 'add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css'],
})
export class AddUserFormComponent implements OnInit {
  public users!: User[];
  public form!: FormGroup;
  public currentDate: Date = new Date();

  public genderFormOptions: FormOptionDataObject[] = GENDERS;
  public defaultGenderFormOption: FormOptionDataObject = {
    text: 'Select gender',
    value: '',
  };

  public educationDirectionFormOptions: FormOptionDataObject[] =
    DIRECTIONS_OF_STUDY;
  public defaultEducationDirectionFormOption: FormOptionDataObject = {
    text: 'Select direction of study',
    value: '',
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
    this.store$.select(UsersSelectors.getAllUsers).subscribe({
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

  public handleValueChangeOfEducationEndDate(): void {
    this.form.controls.dateOfBirth.updateValueAndValidity();
  }

  public handleValueChangeOfEducationStartDate(): void {
    this.form.controls.dateOfBirth.updateValueAndValidity();
  }

  public handleSubmit(): null {
    console.log(this.form.controls.dateOfBirth.value);

    if (this.form.invalid) {
      this.handleFormInvalidStatus();
      return null;
    }

    this.handleFormValidStatus();
    return null;
  }

  private handleFormInvalidStatus(): void {
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
}
