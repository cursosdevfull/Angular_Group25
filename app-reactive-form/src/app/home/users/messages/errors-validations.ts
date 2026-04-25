import { FormGroup } from "@angular/forms";

export const errorsValidations = (fg: FormGroup, controlName: string, title: string): string[] => {
    const control = fg.get(controlName);
    if (!control || !control.errors || !control.touched) return [];

    const errors = Object.keys(control.errors);
    const messages: string[] = [];

    errors.forEach(error => {
        switch (error) {
            case 'required':
                messages.push(`El campo '${title}' es requerido`);
                break;
            case 'minlength':
                messages.push(`El campo '${title}' debe tener al menos ${control.errors ? control?.errors['minlength']?.requiredLength : "0"} caracteres`);
                break;
        }
    })

    return messages;
}