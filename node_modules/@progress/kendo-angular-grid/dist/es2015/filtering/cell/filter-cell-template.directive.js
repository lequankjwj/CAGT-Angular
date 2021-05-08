/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the filter-cell template ([see example]({% slug builtinfiltertemplate_grid %}#toc-customizing-filter-rows)).
 */
export class FilterCellTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
FilterCellTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridFilterCellTemplate]'
            },] },
];
/** @nocollapse */
FilterCellTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
