import { Component, Input } from "@angular/core";
import { FieldState } from "@angular/forms/signals";

@Component({
    selector: 'app-error-validations',
    template: `
        @let messages = getMessageErrors();
        @for(message of messages; track message) {
            <span class="error">{{ message }}</span>
        }
    `,
    styles: `
    span.error {
        display: inline-block;
        color: red;
        font-size: 10px;
        margin-top: 5px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    `
})
export class ErrorValidations {
    @Input() fs!: FieldState<any, string | number>;

    public getMessageErrors(): string[] {
    if(!this.fs.touched() || this.fs.valid()) return [];

    const messages: string[] = [];
    const errors = this.fs.errors()

    errors.forEach(error => {
        messages.push(error?.message || "Error desconocido");
    })

    return messages;       
    }
}