/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, Injectable, isDevMode } from '@angular/core';
/**
 * @hidden
 */
var ExcelService = /** @class */ (function () {
    function ExcelService() {
        this.saveToExcel = new EventEmitter();
        this.exportClick = new EventEmitter();
        this.loadingChange = new EventEmitter();
    }
    ExcelService.prototype.save = function (component) {
        if (this.saveToExcel.observers.length === 0) {
            if (isDevMode()) {
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
        { type: Injectable },
    ];
    return ExcelService;
}());
export { ExcelService };
