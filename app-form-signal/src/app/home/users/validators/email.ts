import { AbstractControl, ValidatorFn } from "@angular/forms";

export const validateDomainEmail = (domains: string[]): ValidatorFn => {
    return (control: AbstractControl) => {
      if(!control || !control.value) return null

      const email: string = control.value;
      const domain = email.substring(email.lastIndexOf('@') + 1);
      
      if(!domains.includes(domain)) return { domainInvalid: `El dominio del correo debe ser uno de los siguientes: ${domains.join(', ')}` }

      return null;
    }
  }

export class CustomValidators {
    static validateDomainEmail(domains: string[]): ValidatorFn {
    return (control: AbstractControl) => {
      if(!control || !control.value) return null

      const email: string = control.value;
      const domain = email.substring(email.lastIndexOf('@') + 1);
      
      if(!domains.includes(domain)) return { domainInvalid: `El dominio del correo debe ser uno de los siguientes: ${domains.join(', ')}` }

      return null;
    }
    }

}