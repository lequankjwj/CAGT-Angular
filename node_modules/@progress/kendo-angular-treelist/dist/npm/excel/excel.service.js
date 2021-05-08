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
var ExcelService = /** @class */ (function () {
    function ExcelService() {
        this.saveToExcel = new core_1.EventEmitter();
        this.exportClick = new core_1.EventEmitter();
        this.loadingChange = new core_1.EventEmitter();
    }
    ExcelService.prototype.save = function (component) {
        if (this.saveToExcel.observers.length === 0) {
            if (core_1.isDevMode()) {
                throw new Error('Saving excel requires including the ExcelModule and adding the <kendo-treelist-excel> component.');
            }
        }
        else {
            this.saveToExcel.emit(component);
        }
    };
    ExcelService.prototype.toggleLoading = function (value) {
        this.loading = value;
        this.loadingChange.emit();
    };
    ExcelService.decorators = [
        { type: core_1.Injectable },
    ];
    return ExcelService;
}());
exports.ExcelService = ExcelService;
