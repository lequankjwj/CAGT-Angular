/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
import { ColumnBase } from '../columns/column-base';
import { ColumnResizeAction, ColumnResizeArgs, AutoFitFn } from './column-resize.interface';
/**
 * @hidden
 */
export declare class ColumnResizingService {
    changes: EventEmitter<ColumnResizeAction>;
    private column;
    private resizedColumns;
    private tables;
    private batch;
    start(column: ColumnBase): void;
    resizeColumns(deltaPercent: number): void;
    resizeTable(column: ColumnBase, delta: number): void;
    resizedColumn(state: ColumnResizeArgs): void;
    end(): void;
    registerTable(tableMetadata: {
        autoFit: AutoFitFn;
        locked: boolean;
    }): () => void;
    measureColumns(info: Array<any>): void;
    autoFit(...columns: ColumnBase[]): void;
    private trackColumns;
    private autoFitStart;
    private autoFitBatch;
}
