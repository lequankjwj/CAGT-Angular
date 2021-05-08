/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @hidden
 */
var ColumnReorderService = /** @class */ (function () {
    function ColumnReorderService() {
        this.changes = new core_1.EventEmitter();
    }
    ColumnReorderService.prototype.reorder = function (e) {
        this.changes.emit(e);
    };
    ColumnReorderService.decorators = [
        { type: core_1.Injectable },
    ];
    return ColumnReorderService;
}());
exports.ColumnReorderService = ColumnReorderService;
