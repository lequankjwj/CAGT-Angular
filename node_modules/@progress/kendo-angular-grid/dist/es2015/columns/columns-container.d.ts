/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { QueryList, EventEmitter } from '@angular/core';
import { ColumnBase } from './column-base';
/**
 * @hidden
 */
export declare class ColumnsContainer {
    private columns;
    allColumns: QueryList<ColumnBase>;
    leafColumns: QueryList<ColumnBase>;
    lockedColumns: QueryList<ColumnBase>;
    nonLockedColumns: QueryList<ColumnBase>;
    lockedLeafColumns: QueryList<ColumnBase>;
    nonLockedLeafColumns: QueryList<ColumnBase>;
    totalLevels: number;
    changes: EventEmitter<any>;
    leafColumnsToRender: ColumnBase[];
    lockedColumnsToRender: ColumnBase[];
    nonLockedColumnsToRender: ColumnBase[];
    hasGroupHeaderColumn: boolean;
    hasGroupFooter: boolean;
    hasFooter: boolean;
    unlockedWidth: number;
    constructor(columns: Function);
    refresh(): boolean;
}
