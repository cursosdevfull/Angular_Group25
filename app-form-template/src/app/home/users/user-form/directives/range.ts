import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[rangeValidation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RangeValidator,
      multi: true,
    },
  ],
})
export class RangeValidator implements Validator {
  @Input('rangeValidation') options: { min?: number; max?: number; fieldName: string } = {
    min: 0,
    max: 0,
    fieldName: '',
  };

  validate(control: AbstractControl): ValidationErrors | null {
    console.log(
      'RangeValidator - validate called with value:',
      control.value,
      'options:',
      this.options,
    );
    if (!control || control.value === null || control.value === undefined) return null;

    const value = +control.value;
    console.log('RangeValidator - value:', value, 'options:', this.options);
    if (this.options.min && value < this.options.min) {
      return {
        rangeInvalid: `El campo '${this.options.fieldName}' debe ser al menos ${this.options.min}.`,
      };
    }
    if (this.options.max && value > this.options.max) {
      return {
        rangeInvalid: `El campo '${this.options.fieldName}' debe ser como máximo ${this.options.max}.`,
      };
    }
    return null;
  }
}
