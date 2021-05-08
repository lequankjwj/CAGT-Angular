/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { QueryList, EventEmitter } from "@angular/core";
import { ColumnsContainer } from "../columns/columns-container";
import { ColumnList } from "../columns/column-list";
import { ColumnBase } from "../columns/column-base";
/**
 * @hidden
 */
export declare class ColumnInfoService {
    visibilityChange: EventEmitter<any>;
    lockedChange: EventEmitter<any>;
    columnRangeChange: EventEmitter<any>;
    columnsContainer: ColumnsContainer;
    private list;
    readonly lockedLeafColumns: QueryList<ColumnBase>;
    readonly nonLockedLeafColumns: QueryList<ColumnBase>;
    readonly isLocked: boolean;
    readonly totalLevels: number;
    readonly leafNamedColumns: ColumnBase[];
    readonly unlockedRootCount: number;
    init(columns: ColumnsContainer, list: () => ColumnList): void;
    changeVisibility(columns: any[]): void;
    changeLocked(columns: any[]): void;
}
