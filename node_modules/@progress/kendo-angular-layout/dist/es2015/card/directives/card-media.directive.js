/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostBinding } from '@angular/core';
/**
 * Specifies any media that will be displayed and aligned in the Card.
 */
export class CardMediaDirective {
    constructor() {
        this.hostClass = true;
    }
}
CardMediaDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCardMedia]'
            },] },
];
CardMediaDirective.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-media',] }]
};
