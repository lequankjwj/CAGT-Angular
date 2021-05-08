/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the filter-cell template ([see example]({% slug builtinfiltertemplate_grid %}#toc-customizing-filter-rows)).
 */
var FilterCellTemplateDirective = /** @class */ (function () {
    function FilterCellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    FilterCellTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoGridFilterCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    FilterCellTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return FilterCellTemplateDirective;
}());
exports.FilterCellTemplateDirective = FilterCellTemplateDirective;
