import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UsersStoreService } from 'src/app/services/users-store/users-store.service';

@Component({
  selector: 'users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit, OnDestroy {
  public users!: User[];
  private usersSub!: Subscription;

  constructor(private usersStoreService: UsersStoreService) {}

  public ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers(): void {
    this.usersSub = this.usersStoreService.getAllUsers().subscribe({
      next: (usersFromState: User[]): void => {
        this.users = usersFromState;
      },
    });
  }

  public handleUserEditing(user: User): void {}

  public handleUserRemoving(user: User): void {
    this.usersStoreService.removeUser(user);
  }

  public ngOnDestroy(): void {
    this.usersSub.unsubscribe();
  }
}
