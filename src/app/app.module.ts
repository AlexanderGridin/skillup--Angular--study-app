import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestCmpComponent } from './components/test-cmp/test-cmp.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';

import { GendersService } from './services/genders/genders.service';
import { DirectionsOfStudyService } from './services/directions-of-study/directions-of-study.service';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { StoreModule } from '@ngrx/store';

import { usersReducer } from './store/users/users.reducer';

@NgModule({
  declarations: [AppComponent, TestCmpComponent, AddUserFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DropDownsModule,
    GridModule,
    DateInputsModule,
    ButtonsModule,
    InputsModule,
    DialogsModule,
    StoreModule.forRoot({ users: usersReducer }),
  ],
  providers: [GendersService, DirectionsOfStudyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
