import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IColumn } from '../interfaces/column';
import { IUser } from '../interfaces/user';
import { UserDetail } from '../user-detail/user-detail';
import { UserTitle } from '../user-title/user-title';

@Component({
  selector: 'app-user-list',
  imports: [UserTitle, UserDetail],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  @Input('users') usersActive: IUser[] = [];
  @Output() onDelete: EventEmitter<number> = new EventEmitter();
  @Output() onEdit: EventEmitter<IUser> = new EventEmitter();

  //columns = ["name", "lastname", "email"]
  // columns: Array<IColumn>
  columns: IColumn[] = [
    { property: 'name', label: 'Nombre' },
    { property: 'lastname', label: 'Apellido' },
    { property: 'email', label: 'Correo' },
    { property: 'age', label: 'Edad (años)' },
    { property: 'gender', label: 'Género' },
    { property: 'actions', label: 'Acciones' },
  ];

  delete(index: number) {
    this.onDelete.emit(index);
  }

  edit(user: IUser) {
    this.onEdit.emit(user);
  }
}
