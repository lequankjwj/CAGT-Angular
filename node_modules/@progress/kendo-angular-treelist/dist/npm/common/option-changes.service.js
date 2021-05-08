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
var OptionChangesService = /** @class */ (function () {
    function OptionChangesService() {
        this.columns = new core_1.EventEmitter();
        this.options = new core_1.EventEmitter();
    }
    OptionChangesService.prototype.optionChanged = function () {
        this.options.emit();
    };
    OptionChangesService.prototype.columnChanged = function () {
        this.columns.emit();
    };
    OptionChangesService.decorators = [
        { type: core_1.Injectable },
    ];
    return OptionChangesService;
}());
exports.OptionChangesService = OptionChangesService;
