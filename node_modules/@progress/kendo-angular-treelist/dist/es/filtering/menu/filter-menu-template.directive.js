/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the filter-menu template
 * ([see example]({% slug builtinfiltertemplate_treelist %}#toc-customizing-filter-menus)).
 */
var FilterMenuTemplateDirective = /** @class */ (function () {
    function FilterMenuTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    FilterMenuTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTreeListFilterMenuTemplate]'
                },] },
    ];
    /** @nocollapse */
    FilterMenuTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return FilterMenuTemplateDirective;
}());
export { FilterMenuTemplateDirective };
