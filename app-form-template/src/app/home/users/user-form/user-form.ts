import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IGender, IUser } from '../interfaces/user';
import { EmailValidation } from './directives/email';
import { LengthValidator } from './directives/length';
import { RangeValidator } from './directives/range';
import { LimitByGender } from './directives/limitByGender';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, EmailValidation, LengthValidator, RangeValidator, LimitByGender],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  @Output() onCreate: EventEmitter<IUser & Partial<{ id: number }>> = new EventEmitter();
  @Input() editUser: (IUser & { id: number }) | null = null;

  @ViewChild('userForm') userForm!: NgForm;

  formData = {
    name: '',
    lastname: '',
    email: '',
    age: 0,
    gender: 'male',
    id: -1,
  };
  isEditMode = false;
  id: number | undefined;
  title = 'Create';

  constructor() {}

  ngOnChanges() {
    if (this.editUser) {
      this.userForm.form.patchValue(this.editUser);
      this.id = this.editUser.id;
      this.isEditMode = true;
      this.title = 'Edit';
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.onCreate.emit({ ...this.userForm.value, id: this.id });

      this.reset();
    } else {
      this.userForm.form.markAllAsTouched();
    }
  }

  reset() {
    this.userForm.resetForm();
    this.title = 'Create';
    this.isEditMode = false;
    this.id = undefined;
  }
}
