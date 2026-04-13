import { Component } from "@angular/core";
import { UserList } from "./users/user-list/user-list";
import { UserForm } from "./users/user-form/user-form";
import { IUser } from "./users/interfaces/user";

@Component({ 
    selector: "app-home",
    templateUrl: "./home.html",
    styleUrl: "./home.scss",
    imports: [UserList, UserForm]
})
export class Home {
  usersActive: IUser[] = [
    { name: "John", lastname: "Doe", email: "john.doe@email.com", age: 30 },
    { name: "Jane", lastname: "Smith", email: "jane.smith@email.com", age: 25 },
    { name: "Bob", lastname: "Johnson", email: "bob.johnson@email.com", age: 40 },
    { name: "Alice", lastname: "Williams", email: "alice.williams@email.com", age: 35 },
    { name: "Charlie", lastname: "Sugar", email: "charlie.sugar@email.com", age: 28 },
    { name: "Emily", lastname: "Davis", email: "emily.davis@email.com", age: 32 },
    { name: "David", lastname: "Miller", email: "david.miller@email.com", age: 45 }
  ]
}