/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export class ColumnReorderService {
    constructor() {
        this.changes = new EventEmitter();
    }
    reorder(e) {
        this.changes.emit(e);
    }
}
ColumnReorderService.decorators = [
    { type: Injectable },
];
