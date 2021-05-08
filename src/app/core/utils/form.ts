import { FormGroup, FormControl } from '@angular/forms';

export class FormUtil {
    /**
     * Assigns values
     * @param target
     * @param source
     */
    assignValues(target, source): void {
        Object.assign(target, source);
    }

    /**
     * Validates all form fields
     * @param formGroup
     */
    static validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            // Trim() value
            if (typeof formGroup.get(field).value === 'string' || formGroup.get(field).value instanceof String) {
                control.setValue(formGroup.get(field).value.trim());
            }

            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    /**
     * Cleans form
     * @param formGroup
     */
    static cleanForm(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(key => {
            if (typeof formGroup.get(key).value === 'string' || formGroup.get(key).value instanceof String) {
                formGroup.get(key).setValue(formGroup.get(key).value.trim());
            }
        });
    }
}
