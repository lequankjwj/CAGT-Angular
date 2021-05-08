/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding } from '@angular/core';
/**
 * Specifies the content in the Card footer.
 */
export class CardFooterComponent {
    constructor() {
        this.hostClass = true;
    }
}
CardFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-card-footer',
                template: `
        <ng-content></ng-content>
    `
            },] },
];
CardFooterComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-footer',] }]
};
