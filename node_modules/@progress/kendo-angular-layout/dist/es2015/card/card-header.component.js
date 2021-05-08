/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding } from '@angular/core';
/**
 * Specifies the content in the Card header.
 */
export class CardHeaderComponent {
    constructor() {
        this.hostClass = true;
    }
}
CardHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-card-header',
                template: `
        <ng-content></ng-content>
    `
            },] },
];
CardHeaderComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-header',] }]
};
