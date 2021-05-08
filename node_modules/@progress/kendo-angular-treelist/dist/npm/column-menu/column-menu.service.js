/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the service that is passed to the
 * [`ColumnMenuTemplate`]({% slug api_treelist_columnmenutemplatedirective %}) directive.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-item/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
var ColumnMenuService = /** @class */ (function () {
    function ColumnMenuService() {
        /**
         * @hidden
         */
        this.closeMenu = new core_1.EventEmitter();
    }
    /**
     * Closes the column menu.
     */
    ColumnMenuService.prototype.close = function () {
        this.closeMenu.emit();
    };
    ColumnMenuService.decorators = [
        { type: core_1.Injectable },
    ];
    return ColumnMenuService;
}());
exports.ColumnMenuService = ColumnMenuService;
