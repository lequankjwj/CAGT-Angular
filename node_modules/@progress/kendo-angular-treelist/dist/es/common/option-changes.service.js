/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from "@angular/core";
/**
 * @hidden
 */
var OptionChangesService = /** @class */ (function () {
    function OptionChangesService() {
        this.columns = new EventEmitter();
        this.options = new EventEmitter();
    }
    OptionChangesService.prototype.optionChanged = function () {
        this.options.emit();
    };
    OptionChangesService.prototype.columnChanged = function () {
        this.columns.emit();
    };
    OptionChangesService.decorators = [
        { type: Injectable },
    ];
    return OptionChangesService;
}());
export { OptionChangesService };
