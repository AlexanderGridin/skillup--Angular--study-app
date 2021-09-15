import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';

import { GendersService } from '../../services/genders/genders.service';
import { DirectionsOfStudyService } from '../../services/directions-of-study/directions-of-study.service';

import { FormOptionDataObject } from '../../interfaces/form-option-data-object';

import { ValidateInputLength } from '../../validators/input-length-validator';
import { User } from 'src/app/interfaces/user';
import { AddUserFormDataObject } from 'src/app/interfaces/add-user-form-data-object';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css'],
})
export class AddUserFormComponent implements OnInit {
  public form!: FormGroup;

  public genderFormOptions: FormOptionDataObject[] =
    this.gendersService.createFormOptions();
  public defaultGenderFormOption: FormOptionDataObject =
    this.genderFormOptions[0];
  public genderFormOptionsWithoutDefault: FormOptionDataObject[] =
    this.genderFormOptions.splice(1);

  public directionsOfStudyFormOptions: FormOptionDataObject[] =
    this.directionsOfStudySerivce.createFormOptions();
  public defaultDirectionOfStudyFormOption: FormOptionDataObject =
    this.directionsOfStudyFormOptions[0];
  public directionOfStudyFormOptionsWithoutDefault: FormOptionDataObject[] =
    this.directionsOfStudyFormOptions.splice(1);

  public currentDate: Date = new Date();

  @Output() onSubmit: EventEmitter<User> = new EventEmitter<User>();
  @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(
    private gendersService: GendersService,
    private directionsOfStudySerivce: DirectionsOfStudyService,
    private usersService: UsersService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        // Validators.minLength(5),
        // Validators.maxLength(15),
        ValidateInputLength,
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

  // TODO: fix return type
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
