import { AbstractControl, ValidationErrors } from "@angular/forms";

export const validateLimitByGender = (control: AbstractControl): ValidationErrors | null => {
    if(!control) return null

    const ctrlGender = control.get("gender")
    const ctrlAge = control.get("age")

    if(!ctrlGender || !ctrlAge) return null

    const gender = ctrlGender.value;
    const age = ctrlAge.value;

    if(gender==="male" && age < 40) return { limitByGender: "Los hombres deben ser mayores de 40 años" }

    if(gender==="female" && age < 25) return { limitByGender: "Las mujeres deben ser mayores de 25 años" }

    return null;
}