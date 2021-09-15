import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormOptionDataObject } from '../../interfaces/form-option-data-object';

import { User } from 'src/app/interfaces/user';
import { AddUserFormDataObject } from 'src/app/interfaces/add-user-form-data-object';
import { UsersService } from 'src/app/services/users/users.service';
import { Store } from '@ngrx/store';
import { UsersSelectors } from 'src/app/store/users/users.selectors';

import { UniqueField } from 'src/app/validators/UniqueField';

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
  public defaultGenderFormOption: FormOptionDataObject =
    this.genderFormOptions[0];
  public genderFormOptionsWithoutDefault: FormOptionDataObject[] =
    this.genderFormOptions.slice(1);

  public directionsOfStudyFormOptions: FormOptionDataObject[] =
    DIRECTIONS_OF_STUDY;
  public defaultDirectionOfStudyFormOption: FormOptionDataObject =
    this.directionsOfStudyFormOptions[0];
  public directionOfStudyFormOptionsWithoutDefault: FormOptionDataObject[] =
    this.directionsOfStudyFormOptions.slice(1);

  @Output() onSubmit: EventEmitter<User> = new EventEmitter<User>();
  @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private store$: Store, private usersService: UsersService) {}

  public ngOnInit(): void {
    this.getAllUsers();
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        UniqueField<User>(this.users, 'userName'),
      ]),
      gender: new FormControl(this.defaultGenderFormOption.value),
      dateOfBirth: new FormControl(this.currentDate, [Validators.required]),
      educationDirection: new FormControl(
        this.defaultDirectionOfStudyFormOption.value,
        [Validators.required]
      ),
      educationStartDate: new FormControl(this.currentDate, [
        Validators.required,
      ]),
      educationEndDate: new FormControl(this.currentDate),
    });
  }

  private getAllUsers(): void {
    this.store$.select(UsersSelectors.getAllUsers).subscribe({
      next: (usersFromStore: User[]): void => {
        this.users = usersFromStore;
      },
    });
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
    this.form.value.userName === '' &&
      this.form.controls.userName.markAsTouched();
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
