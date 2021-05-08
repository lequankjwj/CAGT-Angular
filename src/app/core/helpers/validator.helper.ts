import {AbstractControl, ValidationErrors, Validators, FormGroup, ValidatorFn} from '@angular/forms';

export function UrlValidator(control: AbstractControl): ValidationErrors {
    if (control.pristine) {
        return null;
    }
    const URL_REGEXP = /^(http?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    control.markAsTouched();
    if (URL_REGEXP.test(control.value)) {
        return null;
    }
    return {
        invalidUrl: true,
    };
}

export function PhoneNumberValidator(
    control: AbstractControl
): { [key: string]: any } | null {
    if (control.value === '' || control.value == null) {
        return null;
    }

    // vd dang sdt hop le
    // 0792767841
    // +84792767841
    const URL_REGEXP = /^\+?[0-9]{10,11}$/;
    if (URL_REGEXP.test(control.value)) {
        return null;
    }
    return {
        invalidPhoneNumber: { valid: false, value: control.value },
    };
}

/**
 * Check Space validator
 * @param control
 * @constructor
 */
export function SpaceValidator(
    control: AbstractControl
): { [key: string]: any } | null {
    if (control.value === '' || control.value == null) {
        return null;
    }
    const SPACE_REGEXP = /\s/;
    if (SPACE_REGEXP.test(control.value)) {
        return {
            invalidSpace: true,
        };
    }
    return null;
}

export function NumberValidator(control: AbstractControl): ValidationErrors {
    if (control.pristine) {
        return null;
    }
    const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/;
    control.markAsTouched();

    if (control.value === '' || control.value == null) {
        return null;
    }

    if (NUMBER_REGEXP.test(control.value)) {
        return null;
    }

    return {
        invalidNumber: true,
    };
}

export function CustomEmailValidator(control: AbstractControl): ValidationErrors {
    if (!control.value) {
        return null;
    }
    return Validators.email(control);
}

export function ComparePasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}

export function day(): ValidatorFn {
    const minV = 1;
    const maxV = 31;

    return (c: AbstractControl): { [key: string]: any } | null => {
        const value = parseInt(c.value, 10) || false;
        const isValid = value >= minV && value <= maxV && value;

        return !isValid ? { isInvalidDay: true } : null;
    };
}

export function month(): ValidatorFn {
    const minV = 1;
    const maxV = 12;

    return (c: AbstractControl): { [key: string]: any } | null => {
        const value = parseInt(c.value, 10);
        const isValid = value >= minV && value <= maxV && value;

        return !isValid ? { isInvalidMonth: true } : null;
    };
}

export function year(): ValidatorFn {
    const maxV = new Date().getFullYear() - 18;
    const minV = maxV - 80;

    return (c: AbstractControl): { [key: string]: any } | null => {
        const value = parseInt(c.value, 10) || null;
        const isValid = value >= minV && value <= maxV && value;

        return !isValid ? { isInvalidYear: true } : null;
    };
}
