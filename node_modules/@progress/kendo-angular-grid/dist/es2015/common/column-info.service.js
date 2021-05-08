/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from "@angular/core";
import { ColumnsContainer } from "../columns/columns-container";
import { expandColumns } from "../columns/column-common";
import { orderBy } from '@progress/kendo-data-query';
/**
 * @hidden
 */
export class ColumnInfoService {
    constructor() {
        this.visibilityChange = new EventEmitter();
        this.lockedChange = new EventEmitter();
        this.columnRangeChange = new EventEmitter();
        this.columnsContainer = new ColumnsContainer(() => []);
    }
    get lockedLeafColumns() {
        return this.columnsContainer.lockedLeafColumns;
    }
    get nonLockedLeafColumns() {
        return this.columnsContainer.nonLockedLeafColumns;
    }
    get isLocked() {
        return this.lockedLeafColumns.length > 0;
    }
    get totalLevels() {
        return this.columnsContainer.totalLevels;
    }
    get leafNamedColumns() {
        const columns = expandColumns(this.list().filterSort(column => !column.isColumnGroup))
            .filter(column => column.matchesMedia && column.displayTitle);
        return orderBy(columns, [{ field: 'locked', dir: 'desc' }]);
    }
    get unlockedRootCount() {
        return this.list().rootColumns().filter(column => !column.locked && column.isVisible).length;
    }
    init(columns, list) {
        this.columnsContainer = columns;
        this.list = list;
    }
    changeVisibility(columns) {
        this.visibilityChange.emit(columns);
    }
    changeLocked(columns) {
        this.lockedChange.emit(columns);
    }
}
ColumnInfoService.decorators = [
    { type: Injectable },
];
