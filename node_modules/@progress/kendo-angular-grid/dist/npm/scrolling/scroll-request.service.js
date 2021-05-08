/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
/**
 * @hidden
 */
var ScrollRequestService = /** @class */ (function () {
    function ScrollRequestService() {
        this.requests = new rxjs_1.Subject();
    }
    ScrollRequestService.prototype.scrollTo = function (request) {
        this.requests.next(request);
    };
    ScrollRequestService.decorators = [
        { type: core_1.Injectable },
    ];
    return ScrollRequestService;
}());
exports.ScrollRequestService = ScrollRequestService;
