/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:no-input-rename */
import { Input, EventEmitter, Output } from '@angular/core';
import { isPresent } from "../utils";
/**
 * @hidden
 */
export class Selection {
    constructor(grid, cd) {
        this.grid = grid;
        this.cd = cd;
        /**
         * Defines the collection that will store the selected item keys.
         */
        this.selectedKeys = [];
        /**
         * Fires when the `selectedKeys` collection has been updated.
         */
        this.selectedKeysChange = new EventEmitter();
        this.init();
    }
    init() {
        if (!isPresent(this.grid.rowSelected)) {
            this.grid.rowSelected = (row) => {
                return this.selectedKeys.indexOf(this.getItemKey(row)) >= 0;
            };
        }
        if (!isPresent(this.grid.cellSelected)) {
            this.grid.cellSelected = (row, column, colIndex) => {
                const contender = this.getSelectionItem(row, column, colIndex);
                return {
                    selected: this.selectedKeys.some(item => item.columnKey === contender.columnKey && item.itemKey === contender.itemKey),
                    item: contender
                };
            };
        }
        this.selectionChangeSubscription = this.grid
            .selectionChange
            .subscribe(this.onSelectionChange.bind(this));
    }
    /**
     * @hidden
     */
    destroy() {
        this.selectionChangeSubscription.unsubscribe();
    }
    /**
     * @hidden
     */
    reset() {
        this.selectedKeys = [];
    }
    getItemKey(row) {
        if (this.selectionKey) {
            if (typeof this.selectionKey === "string") {
                return row.dataItem[this.selectionKey];
            }
            if (typeof this.selectionKey === "function") {
                return this.selectionKey(row);
            }
        }
        return row.index;
    }
    getSelectionItem(row, col, colIndex) {
        const itemIdentifiers = {};
        itemIdentifiers.itemKey = this.getItemKey(row);
        if (!isPresent(col) && !isPresent(colIndex)) {
            return itemIdentifiers;
        }
        if (this.columnKey) {
            if (typeof this.columnKey === "string") {
                itemIdentifiers.columnKey = row.dataItem[this.columnKey];
            }
            if (typeof this.columnKey === "function") {
                itemIdentifiers.columnKey = this.columnKey(col, colIndex);
            }
        }
        return {
            itemKey: itemIdentifiers.itemKey,
            columnKey: itemIdentifiers.columnKey ? itemIdentifiers.columnKey : colIndex
        };
    }
    onSelectionChange(selection) {
        if (selection.selectedRows) {
            selection.deselectedRows.forEach((item) => {
                const itemKey = this.getItemKey(item);
                const itemIndex = this.selectedKeys.indexOf(itemKey);
                if (itemIndex >= 0) {
                    this.selectedKeys.splice(itemIndex, 1);
                }
            });
            if (this.grid.selectableSettings.mode === "single" && this.selectedKeys.length > 0) {
                this.reset();
            }
            selection.selectedRows.forEach((item) => {
                const itemKey = this.getItemKey(item);
                if (this.selectedKeys.indexOf(itemKey) < 0) {
                    this.selectedKeys.push(itemKey);
                }
            });
        }
        else {
            selection.deselectedCells.forEach((item) => {
                const itemIndex = this.getCellSelectionItemIndex(item);
                if (itemIndex >= 0) {
                    this.selectedKeys.splice(itemIndex, 1);
                }
            });
            if (this.grid.selectableSettings.mode === "single" && this.selectedKeys.length > 0) {
                this.reset();
            }
            selection.selectedCells.forEach((item) => {
                const itemIndex = this.getCellSelectionItemIndex(item);
                if (itemIndex < 0) {
                    this.selectedKeys.push(item);
                }
            });
        }
        this.cd.markForCheck();
        this.selectedKeysChange.emit(this.selectedKeys);
    }
    getCellSelectionItemIndex(item) {
        return this.selectedKeys.findIndex(selectedItem => selectedItem.itemKey === item.itemKey && selectedItem.columnKey === item.columnKey);
    }
}
Selection.propDecorators = {
    selectedKeys: [{ type: Input }],
    selectionKey: [{ type: Input, args: ["kendoGridSelectBy",] }],
    columnKey: [{ type: Input }],
    selectedKeysChange: [{ type: Output }]
};
