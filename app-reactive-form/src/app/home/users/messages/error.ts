import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

interface IMessageError {
    type: string;
    message: string;
}

@Component({
    selector: 'app-error-validations',
    template: `
        @let messages = getMessageErrors();
        @for(message of messages; track message.type) {
            <span class="error">{{ message.message }}</span>
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
    @Input() fg!: FormGroup;
    @Input() controlName?: string;
    @Input() title?: string;


    public getMessageErrors(): IMessageError[] {
        const messages: IMessageError[] = [];

        if (this.controlName && this.title) {
            const control = this.fg.get(this.controlName);
            if (!control || !control.errors || !control.touched) return [];

            const errors = Object.keys(control.errors);

            errors.forEach(error => {
                switch (error) {
                    case 'required':
                        messages.push({ type: error, message: `El campo '${this.title}' es requerido` });
                        break;
                    case 'minlength':
                        messages.push({ type: error, message: `El campo '${this.title}' debe tener al menos ${control.errors ? control?.errors['minlength']?.requiredLength : "0"} caracteres` });
                        break;
                    case 'pattern':
                        messages.push({ type: error, message: `El campo '${this.title}' no tiene el formato correcto: ${control.errors ? control?.errors['pattern']?.requiredPattern : ""}` });
                        break;
                    case "domainInvalid":
                        messages.push({ type: error, message: `${control.errors ? control?.errors['domainInvalid'] : ""}` });
                        break;
                    case "min":
                        messages.push({ type: error, message: `El campo '${this.title}' debe ser mayor o igual a ${control.errors ? control?.errors['min']?.min : ""}` });
                        break;
                    case "max":
                        messages.push({ type: error, message: `El campo '${this.title}' debe ser menor o igual a ${control.errors ? control?.errors['max']?.max : ""}` });
                        break;

                }
            })
        } else {
            if (!this.fg || !this.fg.touched) return [];

            const errors = Object.keys(this.fg.errors || {});

            errors.forEach(error => {
                switch (error) {
                    case 'limitByGender':
                        messages.push({ type: error, message: `${this.fg.errors ? this.fg.errors['limitByGender'] : ""}` });
                        break;

                }
            })            
        }



        return messages;
    }
}