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
var WindowContainerService = /** @class */ (function () {
    function WindowContainerService() {
    }
    Object.defineProperty(WindowContainerService.prototype, "container", {
        get: function () {
            return WindowContainerService.container;
        },
        set: function (container) {
            WindowContainerService.container = container;
        },
        enumerable: true,
        configurable: true
    });
    WindowContainerService.container = null;
    WindowContainerService.decorators = [
        { type: core_1.Injectable },
    ];
    return WindowContainerService;
}());
exports.WindowContainerService = WindowContainerService;
