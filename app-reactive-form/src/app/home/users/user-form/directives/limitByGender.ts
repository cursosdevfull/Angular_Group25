import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[limitByGender]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: LimitByGender,
      multi: true,
    },
  ],
})
export class LimitByGender implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control) return null;

    const ctrlGender = control.get('gender');
    const ctrlAge = control.get('age');

    if (!ctrlGender || !ctrlGender.value) return null;
    if (!ctrlAge || !ctrlAge.value) return null;

    if (ctrlGender.value === 'male' && ctrlAge.value < 40) {
      return { limitByGender: 'Los hombres deben tener al menos 40 años.' };
    }

    if (ctrlGender.value === 'female' && ctrlAge.value < 25) {
      return { limitByGender: 'Las mujeres deben tener al menos 25 años.' };
    }

    return null;
  }
}
