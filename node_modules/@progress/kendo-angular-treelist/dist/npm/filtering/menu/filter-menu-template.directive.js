/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the filter-menu template
 * ([see example]({% slug builtinfiltertemplate_treelist %}#toc-customizing-filter-menus)).
 */
var FilterMenuTemplateDirective = /** @class */ (function () {
    function FilterMenuTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    FilterMenuTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListFilterMenuTemplate]'
                },] },
    ];
    /** @nocollapse */
    FilterMenuTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return FilterMenuTemplateDirective;
}());
exports.FilterMenuTemplateDirective = FilterMenuTemplateDirective;
