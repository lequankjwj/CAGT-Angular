/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/* tslint:disable:max-line-length */
/**
 * Represents the template for the column menu in the TreeList. Provides an option for
 * customizing the content of the column menu for all or for specific columns.
 * To define the content template, nest an `<ng-template>` tag with the
 * `kendoTreeListColumnMenuTemplate` directive inside the `kendo-treelist` or the `<kendo-treelist-column>` component.
 *
 * The template context is passes through the following fields:
 * - `service`&mdash;Represents the [ColumnMenuService]({% slug api_treelist_columnmenuservice %}).
 * - `column`&mdash;Represents the TreeList column.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
var ColumnMenuTemplateDirective = /** @class */ (function () {
    function ColumnMenuTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ColumnMenuTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListColumnMenuTemplate]'
                },] },
    ];
    /** @nocollapse */
    ColumnMenuTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return ColumnMenuTemplateDirective;
}());
exports.ColumnMenuTemplateDirective = ColumnMenuTemplateDirective;
