import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';

import { UsersStateService } from './services/users-state/users-state.service';
import { UsersService } from './services/users/users.service';

import { DialogsModule } from '@progress/kendo-angular-dialog';
import { StoreModule } from '@ngrx/store';

import { usersReducer } from './store/users/users.reducer';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ContainerComponent } from './components/container/container.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { LabelModule } from '@progress/kendo-angular-label';
import { PageComponent } from './components/page/page.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersPageComponent,
    PageTitleComponent,
    AddUserComponent,
    ContainerComponent,
    UsersTableComponent,
    PageComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DropDownsModule,
    GridModule,
    DateInputsModule,
    LabelModule,
    ButtonsModule,
    InputsModule,
    DialogsModule,
    StoreModule.forRoot({ users: usersReducer }),
  ],
  providers: [UsersStateService, UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
