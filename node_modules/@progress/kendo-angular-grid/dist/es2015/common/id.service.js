/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from "@angular/core";
// Incremented each time the service is instantiated.
let sequence = 0;
/**
 * @hidden
 */
export class IdService {
    constructor() {
        this.prefix = `k-grid${sequence++}`;
    }
    cellId(rowIndex, colIndex) {
        return `${this.prefix}-r${rowIndex}c${colIndex}`;
    }
    selectionCheckboxId(itemIndex) {
        return `${this.prefix}-checkbox${itemIndex}`;
    }
    selectAllCheckboxId() {
        return `${this.prefix}-select-all`;
    }
}
IdService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
IdService.ctorParameters = () => [];
