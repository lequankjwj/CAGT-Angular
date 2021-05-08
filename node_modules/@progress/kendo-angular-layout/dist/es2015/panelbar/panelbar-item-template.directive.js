/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the template directive of the PanelBar which helps to customize the item content.
 */
export class PanelBarItemTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
PanelBarItemTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoPanelBarItemTemplate]'
            },] },
];
/** @nocollapse */
PanelBarItemTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
