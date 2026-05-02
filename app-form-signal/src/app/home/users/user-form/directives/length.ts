import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[lengthValidation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: LengthValidator,
      multi: true,
    },
  ],
})
export class LengthValidator implements Validator {
  @Input('lengthValidation') options: { min?: number; max?: number; fieldName: string } = {
    min: 0,
    max: 0,
    fieldName: '',
  };

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control || !control.value) return null;

    const valueLength = control.value.length;
    if (this.options.min && valueLength < this.options.min) {
      return {
        lengthInvalid: `El campo '${this.options.fieldName}' debe tener al menos ${this.options.min} caracteres.`,
      };
    }
    if (this.options.max && valueLength > this.options.max) {
      return {
        lengthInvalid: `El campo '${this.options.fieldName}' debe tener como máximo ${this.options.max} caracteres.`,
      };
    }
    return null;
  }
}
