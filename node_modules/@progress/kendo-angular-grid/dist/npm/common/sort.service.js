/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
/**
 * @hidden
 */
var SortService = /** @class */ (function () {
    function SortService() {
        this.changes = new rxjs_1.Subject();
    }
    SortService.prototype.sort = function (value) {
        this.changes.next(value);
    };
    return SortService;
}());
exports.SortService = SortService;
