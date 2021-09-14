import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersStateService } from 'src/app/services/users-state/users-state.service';
import { DEFAULT_DATE_FORMAT } from 'src/app/constants/defaultDateFormat';
import { Format } from 'src/app/interfaces/format';

@Component({
  selector: 'users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit {
  public users!: User[];
  public dateFormat: Format = DEFAULT_DATE_FORMAT;

  constructor(private usersStateService: UsersStateService) {}

  public ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.usersStateService.getAllUsers().subscribe({
      next: (usersFromState: User[]): void => {
        this.users = usersFromState;
        console.log(usersFromState);
      },
    });
  }
}
