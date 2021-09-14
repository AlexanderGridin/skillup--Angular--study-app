import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';

import { GendersService } from '../services/genders/genders.service';
import { DirectionsOfStudyService } from '../services/directions-of-study/directions-of-study.service';

import { FormOptionDataObject } from '../interfaces/form-option-data-object';

import { ValidateInputLength } from '../custom-form-validators/input-length-validator';

@Component({
  selector: 'app-add-user-form',
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

  public diresctionsOfStudyFormOptions: FormOptionDataObject[] =
    this.directionsOfStudySerivce.createFormOptions();
  public defaultDirectionOfStudyFormOption: FormOptionDataObject =
    this.diresctionsOfStudyFormOptions[0];
  public directionOfStudyFormOptionsWithoutDefault: FormOptionDataObject[] =
    this.diresctionsOfStudyFormOptions.splice(1);

  public currentDate: Date = new Date();

  public isModalVisible: boolean = false;

  constructor(
    private gendersService: GendersService,
    private directionsOfStudySerivce: DirectionsOfStudyService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.form = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        // Validators.minLength(5),
        // Validators.maxLength(15),
        ValidateInputLength,
      ]),
      gender: new FormControl(this.defaultGenderFormOption.value),
      dateOfBirth: new FormControl(this.currentDate, [Validators.required]),
      educationDirections: new FormControl(
        this.defaultDirectionOfStudyFormOption.value,
        [Validators.required]
      ),
      educationStartDate: new FormControl(this.currentDate, [
        Validators.required,
      ]),
      educationEndDate: new FormControl(this.currentDate),
    });
  }

  public handleSubmit(): void {
    console.log('form submitted');

    if (this.form.status === 'INVALID') {
      if (this.form.value.userName === '') {
        this.form.controls.userName.markAsTouched();
      }

      return;
    }

    console.log('form submitted valid');
    console.log(this.form.value);
    this.closeModal();
  }

  // We can't use method like toogleModalVisibility(), beacause (close) action of kendo-dialog component calls this method twice
  public showModal(): void {
    this.isModalVisible = true;
  }

  public closeModal(): void {
    this.isModalVisible = false;
  }
}
