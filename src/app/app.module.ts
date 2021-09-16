import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { usersReducer } from './store/users/users.reducer';

import { GridModule } from '@progress/kendo-angular-grid';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UsersService } from './services/users/users.service';
import { UsersStoreService } from './services/users-store/users-store.service';

import { UsersPageComponent } from './pages/users-page/users-page.component';

import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ContainerComponent } from './components/container/container.component';
import { UsersTableComponent } from './components/users-table/users-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    AddUserComponent,
    UserFormComponent,
    PageTitleComponent,
    ContainerComponent,
    UsersTableComponent,
    UsersPageComponent,
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
  providers: [UsersService, UsersStoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
