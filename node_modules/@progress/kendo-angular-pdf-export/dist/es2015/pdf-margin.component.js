/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
const FIELDS = ['bottom', 'left', 'right', 'top'];
/**
 * Represents the Kendo UI PDFMargin component for Angular.
 */
export class PDFMarginComponent {
    /**
     * @hidden
     */
    get options() {
        const options = {};
        for (let idx = 0; idx < FIELDS.length; idx++) {
            const field = FIELDS[idx];
            const value = this[field];
            if (typeof value !== 'undefined') {
                options[field] = value;
            }
        }
        return options;
    }
}
PDFMarginComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-pdf-export-margin',
                template: ``
            },] },
];
PDFMarginComponent.propDecorators = {
    left: [{ type: Input }],
    top: [{ type: Input }],
    right: [{ type: Input }],
    bottom: [{ type: Input }]
};
