import { Component, inject, Inject, signal } from '@angular/core';
import { form, FormField, pattern, required } from '@angular/forms/signals';
import { Auth, TAuth, TAuthUseCasesPort } from '../../../domain';
import { ErrorValidations } from 'lib';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AUTH_USE_CASES_PORT } from '../../../auth.di';
import { Router } from '@angular/router';

@Component({
  selector: 'cdev-login',
  imports: [FormField, ErrorValidations, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  user: TAuth = {
    email: '',
    password: '',
  }

  userModel = signal<TAuth>(this.user);

  userForm = form(this.userModel, schema => {
    required(schema.email, { message: 'Email is required' });
    pattern(schema.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email format' });
    required(schema.password, { message: 'Password is required' });
    pattern(schema.password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: 'Password must be at least 8 characters long and contain both letters and numbers' });
  })

  router = inject(Router);

  constructor(@Inject(AUTH_USE_CASES_PORT) private readonly usecase: TAuthUseCasesPort) { }

  async login() {
    const { email, password } = this.userForm().value();

    if (!email || !password) {
      return;
    }

    const auth: Auth = new Auth({ email, password });
    const response = await this.usecase.login(auth);

    if (response) {
      this.router.navigate(['/layout/dashboard']);
    }

  }
}
