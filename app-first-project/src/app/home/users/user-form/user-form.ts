import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IGender, IUser } from '../interfaces/user';

@Component({
  selector: 'app-user-form',
  imports: [],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  @Output() onCreate: EventEmitter<IUser & Partial<{ id: number }>> = new EventEmitter();
  @Input() editUser: (IUser & { id: number }) | null = null;
  @ViewChild('nameInput') inputName!: ElementRef<HTMLInputElement>;
  @ViewChild('lastnameInput') inputLastname!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') inputEmail!: ElementRef<HTMLInputElement>;
  @ViewChild('ageInput') inputAge!: ElementRef<HTMLInputElement>;
  @ViewChild('genderInput') inputGender!: ElementRef<HTMLSelectElement>;
  name = '';
  lastname = '';
  email = '';
  age = 0;
  gender = '';
  isEditMode = false;
  id: number | undefined;

  title = 'Create';

  constructor() {}

  ngOnChanges() {
    if (this.editUser) {
      this.name = this.editUser.name;
      this.lastname = this.editUser.lastname;
      this.email = this.editUser.email;
      this.age = this.editUser.age;
      this.gender = this.editUser.gender;
      this.isEditMode = true;
      this.id = this.editUser.id;
      this.title = 'Edit';

      this.inputName.nativeElement.value = this.name;
      this.inputLastname.nativeElement.value = this.lastname;
      this.inputEmail.nativeElement.value = this.email;
      this.inputAge.nativeElement.value = this.age.toString();
      this.inputGender.nativeElement.value = this.gender;
    }
  }

  onInputName(evt: Event) {
    this.name = (evt.target as HTMLInputElement).value;
  }

  onInputLastname(evt: Event) {
    this.lastname = (evt.target as HTMLInputElement).value;
  }

  onInputEmail(evt: Event) {
    this.email = (evt.target as HTMLInputElement).value;
  }

  onInputAge(evt: Event) {
    this.age = Number((evt.target as HTMLInputElement).value);
  }

  onInputGender(target: EventTarget) {
    this.gender = (target as HTMLSelectElement).value as IGender;
  }

  onSubmit() {
    if (!this.name || !this.lastname || !this.email || !this.age) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }

    if (this.name.trim().length < 3) {
      alert('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    if (this.lastname.trim().length < 3) {
      alert('El apellido debe tener al menos 3 caracteres.');
      return;
    }

    if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (this.age <= 0) {
      alert('Por favor, ingresa una edad válida.');
      return;
    }

    this.onCreate.emit({
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      age: this.age,
      gender: this.gender as IGender,
      id: this.id,
    });
    this.reset();
  }

  reset() {
    this.name = '';
    this.lastname = '';
    this.email = '';
    this.age = 0;
    this.gender = 'male';
    this.isEditMode = false;
    this.id = undefined;
    this.title = 'Create';

    this.inputName.nativeElement.value = '';
    this.inputLastname.nativeElement.value = '';
    this.inputEmail.nativeElement.value = '';
    this.inputAge.nativeElement.value = '';
    this.inputGender.nativeElement.value = 'male';
  }

  /*  ngAfterViewInit() {
    const input = document.getElementById("name") as HTMLInputElement;

    // console.log("input",input)

    input.addEventListener("input", function (evt) {
      this.value = (evt.target as HTMLInputElement).value;
      console.log("value", this.value)
    }) 
  }*/
}
