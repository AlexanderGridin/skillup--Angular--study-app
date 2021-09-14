import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';

import { GenderService } from '../services/gender/gender.service';

import { GenderFormOption } from '../interfaces/gender-form-option';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css'],
})
export class AddUserFormComponent implements OnInit {
  public form!: FormGroup;
  public gendersFormOptions: GenderFormOption[] =
    this.genderService.createFormOptionsData();
  public defaultGender: GenderFormOption = this.gendersFormOptions[0];
  public dropdownGenders: GenderFormOption[] =
    this.gendersFormOptions.splice(1);

  constructor(private genderService: GenderService) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    console.log('init form');
    this.form = new FormGroup({
      userName: new FormControl('', [Validators.required]),
    });
  }

  public handleSubmit(): void {
    console.log('form submitted');
    console.log(this.form.value);
  }
}
