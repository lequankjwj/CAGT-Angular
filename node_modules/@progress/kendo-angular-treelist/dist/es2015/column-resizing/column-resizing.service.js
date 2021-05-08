/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
import { zip } from 'rxjs';
import { leafColumns } from '../columns/column-common';
import { take } from 'rxjs/operators';
/**
 * @hidden
 */
const isLocked = column => column.parent ? isLocked(column.parent) : !!column.locked;
const ɵ0 = isLocked;
/**
 * @hidden
 */
const resizeArgs = (column, extra) => Object.assign({
    columns: leafColumns([column]),
    locked: isLocked(column)
}, extra); // tslint:disable-line:align
const ɵ1 = resizeArgs;
/**
 * @hidden
 */
export class ColumnResizingService {
    constructor() {
        this.changes = new EventEmitter();
        this.tables = [];
        this.batch = null;
    }
    start(column) {
        this.trackColumns(column);
        const columns = (this.column.isColumnGroup ? [column] : [])
            .concat(leafColumns([column]));
        this.changes.emit({
            columns: columns,
            locked: isLocked(this.column),
            type: 'start'
        });
    }
    resizeColumns(deltaPercent) {
        const action = resizeArgs(this.column, {
            deltaPercent,
            type: 'resizeColumn'
        });
        this.changes.emit(action);
    }
    resizeTable(column, delta) {
        const action = resizeArgs(column, {
            delta,
            type: 'resizeTable'
        });
        this.changes.emit(action);
    }
    resizedColumn(state) {
        this.resizedColumns.push(state);
    }
    end() {
        this.changes.emit({
            columns: [],
            resizedColumns: this.resizedColumns,
            type: 'end'
        });
    }
    registerTable(tableMetadata) {
        this.tables.push(tableMetadata);
        const unregisterTable = () => {
            this.tables.splice(this.tables.indexOf(tableMetadata), 1);
        };
        return unregisterTable;
    }
    measureColumns(info) {
        if (this.batch !== null) {
            this.batch.push(...info);
        }
        else {
            this.autoFitBatch(info, () => this.end());
        }
    }
    autoFit(...columns) {
        const nonLockedColumns = columns.filter(column => !column.isLocked);
        this.autoFitStart(nonLockedColumns);
        this.autoFitBatch(this.batch, () => {
            if (nonLockedColumns.length < columns.length) {
                const lockedColumns = columns.filter(column => column.isLocked);
                this.autoFitStart(lockedColumns);
                this.autoFitBatch(this.batch, () => this.end());
            }
            else {
                this.end();
            }
        });
    }
    trackColumns(column) {
        this.resizedColumns = [];
        this.column = column;
    }
    autoFitStart(columns) {
        this.batch = [];
        this.resizedColumns = [];
        if (columns.length === 0) {
            return;
        }
        const locked = columns[0].isLocked;
        this.changes.emit({
            type: 'start',
            columns,
            locked
        });
        this.changes.emit({
            type: 'triggerAutoFit',
            columns,
            locked
        });
    }
    autoFitBatch(info, onComplete) {
        const locked = info.length > 0 ? info[0].column.isLocked : false;
        const observables = this.tables
            .filter(table => table.locked === locked)
            .map(table => table.autoFit(info));
        zip(...observables)
            .pipe(take(1))
            .subscribe(widths => {
            this.changes.emit({
                columns: info.map(i => i.column),
                type: 'autoFitComplete',
                widths,
                locked
            });
            if (onComplete) {
                onComplete();
            }
        });
        this.batch = null;
    }
}
ColumnResizingService.decorators = [
    { type: Injectable },
];
export { ɵ0, ɵ1 };
