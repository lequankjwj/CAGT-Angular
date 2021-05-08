/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the no-records template of the TreeList. Provides an option to customize the
 * appearance of the item that is displayed when no data is present. To define the no-records template,
 * nest an `<ng-template>` tag with the `kendoTreeListNoRecordsTemplate` directive inside `<kendo-treelist>`.
 *
 * > When the locked columns of the TreeList are in use, the template is displayed in the non-locked part of the content.
 *
 * {% meta height:533 %}
 * {% embed_file configuration/no-records-template/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
var NoRecordsTemplateDirective = /** @class */ (function () {
    function NoRecordsTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    NoRecordsTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListNoRecordsTemplate]'
                },] },
    ];
    /** @nocollapse */
    NoRecordsTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return NoRecordsTemplateDirective;
}());
exports.NoRecordsTemplateDirective = NoRecordsTemplateDirective;
