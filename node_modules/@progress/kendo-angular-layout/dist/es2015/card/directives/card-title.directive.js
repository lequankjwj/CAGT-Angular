/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostBinding } from '@angular/core';
/**
 * Specifies the text and styles for the title of the Card.
 */
export class CardTitleDirective {
    constructor() {
        this.hostClass = true;
    }
}
CardTitleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCardTitle]'
            },] },
];
CardTitleDirective.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-title',] }]
};
