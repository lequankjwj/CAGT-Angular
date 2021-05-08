/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the filter-menu template
 * ([see example]({% slug builtinfiltertemplate_grid %}#toc-customizing-filter-menus)).
 */
export class FilterMenuTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
FilterMenuTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridFilterMenuTemplate]'
            },] },
];
/** @nocollapse */
FilterMenuTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
