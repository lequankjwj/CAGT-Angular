/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Optional, TemplateRef } from '@angular/core';
/**
 * Represents a template that defines the footer content of the Drawer.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoDrawerFooterTemplate` directive inside the `<kendo-drawer>` tag.
 */
export class DrawerFooterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
DrawerFooterTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDrawerFooterTemplate]'
            },] },
];
/** @nocollapse */
DrawerFooterTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
