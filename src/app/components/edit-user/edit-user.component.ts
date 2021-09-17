import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersStoreService } from 'src/app/services/users-store/users-store.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  @Input() user!: User | null;

  // public isModalVisible: boolean = this.user && true;
  public modalTitle: string = 'Edit user';
  public modalMinWidth: number = 250;
  public modalWidth: number = 450;

  constructor(private usersStoreService: UsersStoreService) {}

  public ngOnInit(): void {
    console.log('edit-user init');

    console.log(this.user);
  }

  public handleFormSubmit(newUser: User): void {
    this.usersStoreService.addUser(newUser);
    this.closeModal();
  }

  public closeModal(): void {
    this.user = null;
    // this.isModalVisible = false;
  }
}
