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
var LocalEditService = /** @class */ (function () {
    function LocalEditService() {
    }
    LocalEditService.prototype.create = function (_item, _parent, _id) {
        this.throwUnsupportedError();
    };
    LocalEditService.prototype.update = function (_item) {
        // noop
    };
    LocalEditService.prototype.remove = function (_item) {
        this.throwUnsupportedError();
    };
    LocalEditService.prototype.assignValues = function (target, source) {
        Object.assign(target, source);
    };
    LocalEditService.prototype.throwUnsupportedError = function () {
        if (core_1.isDevMode()) {
            throw new Error('The default edit service of the editing directives can only update the items.' +
                'Please provide an editService.');
        }
    };
    return LocalEditService;
}());
exports.LocalEditService = LocalEditService;
