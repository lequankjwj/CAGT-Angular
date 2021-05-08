/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/* tslint:disable:max-line-length */
/**
 * Represents the content template of the
 * [`kendo-treelist-columnmenu-item`]({% slug api_treelist_columnmenuitemcomponent %}) component.
 * Provides an option for specifying the content of a column item.
 * To define the content template, nest an `<ng-template>` tag with the
 * `kendoTreeListColumnMenuItemContentTemplate` directive inside a `<kendo-treelist-columnmenu-item>`.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-item-content/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
var ColumnMenuItemContentTemplateDirective = /** @class */ (function () {
    function ColumnMenuItemContentTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ColumnMenuItemContentTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListColumnMenuItemContentTemplate]'
                },] },
    ];
    /** @nocollapse */
    ColumnMenuItemContentTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return ColumnMenuItemContentTemplateDirective;
}());
exports.ColumnMenuItemContentTemplateDirective = ColumnMenuItemContentTemplateDirective;
