/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Optional, TemplateRef } from '@angular/core';
/**
 * Represents a template that defines the header content of the Drawer.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoDrawerHeaderTemplate` directive inside the `<kendo-drawer>` tag.
 */
var DrawerHeaderTemplateDirective = /** @class */ (function () {
    function DrawerHeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DrawerHeaderTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDrawerHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    DrawerHeaderTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return DrawerHeaderTemplateDirective;
}());
export { DrawerHeaderTemplateDirective };
