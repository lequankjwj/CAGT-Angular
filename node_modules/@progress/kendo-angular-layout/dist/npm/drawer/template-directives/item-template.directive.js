/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents a template that defines the item content of the Drawer.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoDrawerItemTemplate` directive inside the `<kendo-drawer>` tag.
 */
var DrawerItemTemplateDirective = /** @class */ (function () {
    function DrawerItemTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DrawerItemTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoDrawerItemTemplate]'
                },] },
    ];
    /** @nocollapse */
    DrawerItemTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return DrawerItemTemplateDirective;
}());
exports.DrawerItemTemplateDirective = DrawerItemTemplateDirective;
