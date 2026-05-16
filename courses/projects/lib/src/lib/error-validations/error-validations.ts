import { Component, Input } from "@angular/core";
import { FieldState } from "@angular/forms/signals";

@Component({
  selector: 'mat-error[cdev-lib-error-validations]',
  template: `
    {{ getMessageError() }}
    `
})
export class ErrorValidations {
  @Input() fs!: FieldState<any, string | number>;

  public getMessageError(): string {
    if (!this.fs.touched() || this.fs.valid()) return '';

    const firstError = this.fs.errors()[0];
    return firstError?.message || 'Error desconocido';
  }
}
