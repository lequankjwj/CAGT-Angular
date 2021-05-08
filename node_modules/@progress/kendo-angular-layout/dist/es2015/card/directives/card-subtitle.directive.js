/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostBinding } from '@angular/core';
/**
 * Specifies the text and styles for the subtitle of the Card.
 */
export class CardSubtitleDirective {
    constructor() {
        this.hostClass = true;
    }
}
CardSubtitleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCardSubtitle]'
            },] },
];
CardSubtitleDirective.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-subtitle',] }]
};
