import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersStateService } from 'src/app/services/users-state/users-state.service';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  public isModalVisible: boolean = false;
  public modalTitle: string = 'Add user';
  public modalMinWidth: number = 250;
  public modalWidth: number = 450;

  constructor(private usersStateService: UsersStateService) {}

  public ngOnInit(): void {}

  public handleFormSubmit(newUser: User): void {
    this.usersStateService.addUser(newUser);
    this.closeModal();
  }

  // We can't use method like toogleModalVisibility(), beacause (close) action of kendo-dialog component calls his method twice
  public closeModal(): void {
    this.isModalVisible = false;
  }

  public showModal(): void {
    this.isModalVisible = true;
  }
}
