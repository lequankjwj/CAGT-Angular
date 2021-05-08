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
var Selection = /** @class */ (function () {
    function Selection(grid, cd) {
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
    Selection.prototype.init = function () {
        var _this = this;
        if (!isPresent(this.grid.rowSelected)) {
            this.grid.rowSelected = function (row) {
                return _this.selectedKeys.indexOf(_this.getItemKey(row)) >= 0;
            };
        }
        if (!isPresent(this.grid.cellSelected)) {
            this.grid.cellSelected = function (row, column, colIndex) {
                var contender = _this.getSelectionItem(row, column, colIndex);
                return {
                    selected: _this.selectedKeys.some(function (item) { return item.columnKey === contender.columnKey && item.itemKey === contender.itemKey; }),
                    item: contender
                };
            };
        }
        this.selectionChangeSubscription = this.grid
            .selectionChange
            .subscribe(this.onSelectionChange.bind(this));
    };
    /**
     * @hidden
     */
    Selection.prototype.destroy = function () {
        this.selectionChangeSubscription.unsubscribe();
    };
    /**
     * @hidden
     */
    Selection.prototype.reset = function () {
        this.selectedKeys = [];
    };
    Selection.prototype.getItemKey = function (row) {
        if (this.selectionKey) {
            if (typeof this.selectionKey === "string") {
                return row.dataItem[this.selectionKey];
            }
            if (typeof this.selectionKey === "function") {
                return this.selectionKey(row);
            }
        }
        return row.index;
    };
    Selection.prototype.getSelectionItem = function (row, col, colIndex) {
        var itemIdentifiers = {};
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
    };
    Selection.prototype.onSelectionChange = function (selection) {
        var _this = this;
        if (selection.selectedRows) {
            selection.deselectedRows.forEach(function (item) {
                var itemKey = _this.getItemKey(item);
                var itemIndex = _this.selectedKeys.indexOf(itemKey);
                if (itemIndex >= 0) {
                    _this.selectedKeys.splice(itemIndex, 1);
                }
            });
            if (this.grid.selectableSettings.mode === "single" && this.selectedKeys.length > 0) {
                this.reset();
            }
            selection.selectedRows.forEach(function (item) {
                var itemKey = _this.getItemKey(item);
                if (_this.selectedKeys.indexOf(itemKey) < 0) {
                    _this.selectedKeys.push(itemKey);
                }
            });
        }
        else {
            selection.deselectedCells.forEach(function (item) {
                var itemIndex = _this.getCellSelectionItemIndex(item);
                if (itemIndex >= 0) {
                    _this.selectedKeys.splice(itemIndex, 1);
                }
            });
            if (this.grid.selectableSettings.mode === "single" && this.selectedKeys.length > 0) {
                this.reset();
            }
            selection.selectedCells.forEach(function (item) {
                var itemIndex = _this.getCellSelectionItemIndex(item);
                if (itemIndex < 0) {
                    _this.selectedKeys.push(item);
                }
            });
        }
        this.cd.markForCheck();
        this.selectedKeysChange.emit(this.selectedKeys);
    };
    Selection.prototype.getCellSelectionItemIndex = function (item) {
        return this.selectedKeys.findIndex(function (selectedItem) {
            return selectedItem.itemKey === item.itemKey && selectedItem.columnKey === item.columnKey;
        });
    };
    Selection.propDecorators = {
        selectedKeys: [{ type: Input }],
        selectionKey: [{ type: Input, args: ["kendoGridSelectBy",] }],
        columnKey: [{ type: Input }],
        selectedKeysChange: [{ type: Output }]
    };
    return Selection;
}());
export { Selection };
