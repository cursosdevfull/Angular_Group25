import { Component, Input } from '@angular/core';
import { IColumn } from '../interfaces/column';
import { UserDetail } from '../user-detail/user-detail';
import { UserTitle } from '../user-title/user-title';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'app-user-list',
  imports: [UserTitle, UserDetail],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  @Input("users") usersActive: IUser[] = [];

  //columns = ["name", "lastname", "email"]
  // columns: Array<IColumn>
  columns: IColumn[] = [
    {property: "name", label: "Nombre"},
    {property: "lastname", label: "Apellido"},
    {property: "email", label: "Correo"},
    {property: "age", label: "Edad (años)"}
  ]
}
