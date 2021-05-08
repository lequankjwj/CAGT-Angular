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
var SuspendService = /** @class */ (function () {
    function SuspendService() {
        this.scroll = false;
    }
    SuspendService.decorators = [
        { type: core_1.Injectable },
    ];
    return SuspendService;
}());
exports.SuspendService = SuspendService;
