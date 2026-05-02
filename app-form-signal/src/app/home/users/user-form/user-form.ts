import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { form, FormField, max, min, minLength, required, requiredError, submit, validate } from '@angular/forms/signals';
import { IUser } from '../interfaces/user';
import { ErrorValidations } from '../messages/error';

@Component({
  selector: 'app-user-form',
  imports: [FormField, ErrorValidations],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  @Output() onCreate: EventEmitter<IUser> = new EventEmitter();
  @Input() editUser: IUser | null = null;

  private domains = ["company.com", "pe.company.com", "org.company.com"]

  private originalUser: IUser = {
    name: '',
    lastname: '',
    email: '',
    age: 0,
    gender: 'male',
    id: -1,
  };
  
  private userModel = signal<IUser>(this.originalUser);

  public userForm = form(this.userModel, schema => {
    required(schema.name, {message: 'El nombre es requerido'});
    minLength(schema.name, 3, {message: 'El nombre debe tener al menos 3 caracteres'});
    required(schema.lastname, {message: 'El apellido es requerido'});
    minLength(schema.lastname, 3, {message: 'El apellido debe tener al menos 3 caracteres'});
    required(schema.email, {message: 'El correo es requerido'});
    validate(schema.email, ctx => {
      return ctx.value().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? null : requiredError({message: 'El correo no es válido'});
    });
    validate(schema.email, ctx => {
      const email: string = ctx.value();
      const domain = email.substring(email.lastIndexOf('@') + 1);
      const domains = this.domains;
      return domains.includes(domain) ? null : requiredError({message: `El dominio del correo debe ser uno de los siguientes: ${domains.join(', ')}`});
    });
    required(schema.age, {message: 'La edad es requerida'});
    min(schema.age, 18, {message: 'La edad mínima es 18 años'});
    max(schema.age, 120, {message: 'La edad máxima es 120 años'});
    required(schema.gender, {message: 'El género es requerido'});
    validate(schema, ctx => {
      if(!ctx) return null

      const ctrlGender = ctx.fieldTree.gender
      const ctrlAge = ctx.fieldTree.age

      if(!ctrlGender || !ctrlAge) return null

      const gender = ctrlGender().value();
      const age = ctrlAge().value();

      if(gender==="male" && age <40) return requiredError({message: "Los hombres deben ser mayores de 40 años"})
      if(gender==="female" && age <25) return requiredError({message: "Las mujeres deben ser mayores de 25 años"})

      return null;
    })
  })
  
  isEditMode = false;
  id: number | undefined;
  title = 'Create';

  public onSubmit() {
    submit(this.userForm, async () => undefined);
  }

  public reset() {
    this.userForm().reset(this.originalUser);
  }
}
