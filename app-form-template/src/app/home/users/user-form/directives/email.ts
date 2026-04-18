import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[emailValidation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidation,
      multi: true,
    },
  ],
})
export class EmailValidation implements Validator {
  @Input('emailValidation') options = {fieldName: 'email'};
  validate(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!control || !control.value) return null;

    if (!emailRegex.test(control.value)) {
      return { emailInvalid: `El campo '${this.options.fieldName}' no es un correo válido.` };
    }
    return null;
  }
}
