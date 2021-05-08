/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Optional, TemplateRef } from '@angular/core';
/**
 * Represents a template that defines the item content of the Drawer.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoDrawerItemTemplate` directive inside the `<kendo-drawer>` tag.
 */
export class DrawerItemTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
DrawerItemTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDrawerItemTemplate]'
            },] },
];
/** @nocollapse */
DrawerItemTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
