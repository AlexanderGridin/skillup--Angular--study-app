import { Component, Input, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { DEFAULT_DATE_FORMAT } from 'src/app/constants/default-date-format';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent {
  @Input() public users!: User[];

  public dateFormat: string = DEFAULT_DATE_FORMAT;

  public headerStyle: {} = {
    'background-color': '#666',
    color: '#fff',
    'line-height': '1em',
    'text-align': 'center',
  };

  public style: {} = {
    'text-align': 'center',
  };

  @Output() private onUserEdit: EventEmitter<User> = new EventEmitter<User>();
  @Output() private onUserRemove: EventEmitter<User> = new EventEmitter<User>();

  public editUser(user: User): void {
    this.onUserEdit.emit(user);
  }

  public removeUser(user: User): void {
    this.onUserRemove.emit(user);
  }
}
