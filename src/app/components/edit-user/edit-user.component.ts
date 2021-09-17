import {
  Component,
  Input,
  OnInit,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { AddUserFormDataObj } from 'src/app/interfaces/add-user-form-data-obj';
import { User } from 'src/app/interfaces/user';
import { UsersStoreService } from 'src/app/services/users-store/users-store.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit, OnChanges {
  @Input() public user!: User | null;
  public userFormDataObj!: AddUserFormDataObj | null;

  public modalTitle: string = 'Edit user';
  public modalMinWidth: number = 250;
  public modalWidth: number = 450;

  @Output() public onUserEditingCancel: EventEmitter<User | null> =
    new EventEmitter<User | null>();

  constructor(
    private usersStoreService: UsersStoreService,
    private usersService: UsersService
  ) {}

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    this.userFormDataObj = this.usersService.convertUserToAddUserFormDataObj(
      this.user
    );
  }

  public handleFormSubmit(newUser: User): void {
    this.usersStoreService.addUser(newUser);
    this.closeModal();
  }

  public closeModal(): void {
    this.onUserEditingCancel.emit(this.user);
  }
}
