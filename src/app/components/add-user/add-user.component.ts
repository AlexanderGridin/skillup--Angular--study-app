import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersStoreService } from 'src/app/services/users-store/users-store.service';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  public isModalVisible: boolean = false;
  public modalTitle: string = 'Add user';
  public modalMinWidth: number = 250;
  public modalWidth: number = 450;

  constructor(private usersStoreService: UsersStoreService) {}

  public handleFormSubmit(newUser: User): void {
    this.usersStoreService.addUser(newUser);
    this.closeModal();
  }

  public closeModal(): void {
    this.isModalVisible = false;
  }

  public showModal(): void {
    this.isModalVisible = true;
  }
}
