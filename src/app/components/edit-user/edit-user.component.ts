import {
  Component,
  Input,
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
export class EditUserComponent implements OnChanges {
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

  public ngOnChanges(): void {
    this.userFormDataObj = this.usersService.convertUserToAddUserFormDataObj(
      this.user
    );
  }

  public handleFormSubmit(updatedUser: User): void {
    this.usersStoreService.updateUser(this.user as User, updatedUser);
    this.closeModal();
  }

  public closeModal(): void {
    this.onUserEditingCancel.emit(this.user);
  }
}
