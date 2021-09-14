import { Component, Input } from '@angular/core';
import { DEFAULT_DATE_FORMAT } from 'src/app/constants/defaultDateFormat';
import { Format } from 'src/app/interfaces/format';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent {
  @Input() public users!: User[];

  public dateFormat: Format = DEFAULT_DATE_FORMAT;

  // TODO: fix data types
  public headerStyle: any = {
    'background-color': '#666',
    color: '#fff',
    'line-height': '1em',
    'text-align': 'center',
  };
  // TODO: fix data types
  public style: any = {
    'text-align': 'center',
  };
}
