import { Component } from '@angular/core';
import { IUser } from './users/interfaces/user';
import { UserForm } from './users/user-form/user-form';
import { UserList } from './users/user-list/user-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [UserList, UserForm],
})
export class Home {
  usersActive: IUser[] = [
    { name: 'John', lastname: 'Doe', email: 'john.doe@email.com', age: 30, gender: 'male' },
    { name: 'Jane', lastname: 'Smith', email: 'jane.smith@email.com', age: 25, gender: 'female' },
    { name: 'Bob', lastname: 'Johnson', email: 'bob.johnson@email.com', age: 40, gender: 'male' },
    {
      name: 'Alice',
      lastname: 'Williams',
      email: 'alice.williams@email.com',
      age: 35,
      gender: 'female',
    },
    {
      name: 'Charlie',
      lastname: 'Sugar',
      email: 'charlie.sugar@email.com',
      age: 28,
      gender: 'male',
    },
    { name: 'Emily', lastname: 'Davis', email: 'emily.davis@email.com', age: 32, gender: 'female' },
    { name: 'David', lastname: 'Miller', email: 'david.miller@email.com', age: 45, gender: 'male' },
  ];

  userSelected: (IUser & { id: number }) | null = null;

  delete(index: number) {
    const existsingUser = this.usersActive[index];

    if (!existsingUser) {
      alert('No existe el usuario a eliminar');
      return;
    }

    if (
      confirm(
        `¿Estás seguro de que deseas eliminar este usuario: ${existsingUser.name} ${existsingUser.lastname}?`,
      )
    ) {
      {
        this.usersActive.splice(index, 1);
      }
    }
  }

  edit(user: IUser) {
    console.log('Editando usuario:', user);
    this.userSelected = {
      ...user,
      id: this.usersActive.includes(user) ? this.usersActive.indexOf(user) : -1,
    };
  }

  create(user: IUser & Partial<{ id: number }>) {
    if (user.id !== undefined && user.id !== null) {
      const index = this.usersActive[user.id] ? user.id : -1;

      if (index === -1) {
        alert('No existe el usuario a editar');
        return;
      }

      this.usersActive[index] = user as Omit<IUser & Partial<{ id: number }>, 'id'>;

      return;
    }

    this.usersActive = [...this.usersActive, user as IUser];
  }
}
