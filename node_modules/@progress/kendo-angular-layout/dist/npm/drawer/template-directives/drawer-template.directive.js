/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents a template that defines the content of the Drawer.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoDrawerTemplate` directive inside the `<kendo-drawer>` tag.
 * Using this template directive will override all other templates,
 * for example, `kendoDrawerHeaderTemplate` and `kendoDrawerItemTemplate`.
 */
var DrawerTemplateDirective = /** @class */ (function () {
    function DrawerTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DrawerTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoDrawerTemplate]'
                },] },
    ];
    /** @nocollapse */
    DrawerTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return DrawerTemplateDirective;
}());
exports.DrawerTemplateDirective = DrawerTemplateDirective;
