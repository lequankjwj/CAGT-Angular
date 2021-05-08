/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
/**
 * Represents the content of the [Kendo UI Drawer component for Angular]({% slug overview_drawer %}).
 */
var DrawerContentComponent = /** @class */ (function () {
    function DrawerContentComponent() {
        this.hostClasses = true;
    }
    DrawerContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-drawer-content',
                    template: "\n        <ng-content></ng-content>\n    ",
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    DrawerContentComponent.ctorParameters = function () { return []; };
    DrawerContentComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-drawer-content',] }]
    };
    return DrawerContentComponent;
}());
export { DrawerContentComponent };
