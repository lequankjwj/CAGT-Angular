/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding } from '@angular/core';
/**
 * Specifies the content in the Card body.
 */
export class CardBodyComponent {
    constructor() {
        this.hostClass = true;
    }
}
CardBodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-card-body',
                template: `
        <ng-content></ng-content>
    `
            },] },
];
CardBodyComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-body',] }]
};
