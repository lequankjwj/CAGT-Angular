/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Optional, TemplateRef } from '@angular/core';
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
        { type: Directive, args: [{
                    selector: '[kendoTreeListColumnMenuItemContentTemplate]'
                },] },
    ];
    /** @nocollapse */
    ColumnMenuItemContentTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return ColumnMenuItemContentTemplateDirective;
}());
export { ColumnMenuItemContentTemplateDirective };
