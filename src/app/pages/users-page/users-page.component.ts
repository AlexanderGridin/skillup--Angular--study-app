import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersStateService } from 'src/app/services/users-state/users-state.service';

@Component({
  selector: 'users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit {
  public users!: User[];

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
