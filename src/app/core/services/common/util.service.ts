import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DOCUMENT, Location } from '@angular/common';
import { Inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilService {
    constructor(private location: Location, @Inject(DOCUMENT) private document) {}

    /**
     * Sets scroll top
     */
    setScrollTop(animation?: boolean) {
        const scrollToTop = window.setInterval(() => {
            const pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, animation ? pos - 20 : 0);
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 0);
    }

    /**
     * Validates all form fields
     * @param formGroup
     */
    validateAllFormFields(formGroup: FormGroup) {
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
    cleanForm(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(key => {
            if (typeof formGroup.get(key).value === 'string' || formGroup.get(key).value instanceof String) {
                formGroup.get(key).setValue(formGroup.get(key).value.trim());
            }
        });
    }

    extendDateTimeNameExport() {
        // new Date()).format('DDMMYYHHmmss')
        const m = new Date();
        const dateString =
            m.getUTCDate().toString() +
            (m.getUTCMonth() + 1).toString() +
            m.getUTCFullYear().toString() +
            m.getUTCHours().toString() +
            m.getUTCMinutes().toString() +
            m.getUTCSeconds().toString();
        return dateString;
    }

    /**
     * Gets random int
     * @param max
     * @returns
     */
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    convertDateTimeToUTC(newDate) {
        const updateDateUTC = new Date(newDate);
        updateDateUTC.setHours(0, 0, 0, 0);
        return updateDateUTC;
    }

    /**
     * Check ngay ket thuc > ngay bat dau
     * @param dateFrom
     * @param dateTo
     */
    checkDateFromDateTo(dateFrom, dateTo) {
        const from = this.convertDateTimeToUTC(dateFrom);
        const to = this.convertDateTimeToUTC(dateTo);
        if (to < from) {
            return false;
        }
        return true;
    }

    convertFullDate(newDate) {
        const today = new Date(newDate);
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }
}
