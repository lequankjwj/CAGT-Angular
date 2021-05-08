/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
/**
 * Represents the content of the [Kendo UI Drawer component for Angular]({% slug overview_drawer %}).
 */
export class DrawerContentComponent {
    constructor() {
        this.hostClasses = true;
    }
}
DrawerContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-drawer-content',
                template: `
        <ng-content></ng-content>
    `,
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
DrawerContentComponent.ctorParameters = () => [];
DrawerContentComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-drawer-content',] }]
};
