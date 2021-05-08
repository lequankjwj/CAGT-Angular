/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// Incremented each time the service is instantiated.
var sequence = 0;
/**
 * @hidden
 */
var IdService = /** @class */ (function () {
    function IdService() {
        this.prefix = "k-grid" + sequence++;
    }
    IdService.prototype.cellId = function (rowIndex, colIndex) {
        return this.prefix + "-r" + rowIndex + "c" + colIndex;
    };
    IdService.prototype.selectionCheckboxId = function (itemIndex) {
        return this.prefix + "-checkbox" + itemIndex;
    };
    IdService.prototype.selectAllCheckboxId = function () {
        return this.prefix + "-select-all";
    };
    IdService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    IdService.ctorParameters = function () { return []; };
    return IdService;
}());
exports.IdService = IdService;
