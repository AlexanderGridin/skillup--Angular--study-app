import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { DEFAULT_DATE_FORMAT } from 'src/app/constants/default-date-format';

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
}
