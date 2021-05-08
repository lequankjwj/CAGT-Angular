/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the content of the [Kendo UI Drawer component for Angular]({% slug overview_drawer %}).
 */
var DrawerContentComponent = /** @class */ (function () {
    function DrawerContentComponent() {
        this.hostClasses = true;
    }
    DrawerContentComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-drawer-content',
                    template: "\n        <ng-content></ng-content>\n    ",
                    encapsulation: core_1.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    DrawerContentComponent.ctorParameters = function () { return []; };
    DrawerContentComponent.propDecorators = {
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-drawer-content',] }]
    };
    return DrawerContentComponent;
}());
exports.DrawerContentComponent = DrawerContentComponent;
