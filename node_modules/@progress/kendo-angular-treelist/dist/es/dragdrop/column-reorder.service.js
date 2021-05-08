/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
var ColumnReorderService = /** @class */ (function () {
    function ColumnReorderService() {
        this.changes = new EventEmitter();
    }
    ColumnReorderService.prototype.reorder = function (e) {
        this.changes.emit(e);
    };
    ColumnReorderService.decorators = [
        { type: Injectable },
    ];
    return ColumnReorderService;
}());
export { ColumnReorderService };
