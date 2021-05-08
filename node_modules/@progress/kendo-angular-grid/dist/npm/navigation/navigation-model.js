/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_map_1 = require("./item-map");
/**
 * @hidden
 *
 * Contains information for the currently rendered rows and cells.
 */
var NavigationModel = /** @class */ (function () {
    function NavigationModel() {
        this.rows = new item_map_1.ItemMap();
    }
    Object.defineProperty(NavigationModel.prototype, "firstRow", {
        get: function () {
            return this.rows.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationModel.prototype, "lastRow", {
        get: function () {
            return this.rows.last;
        },
        enumerable: true,
        configurable: true
    });
    NavigationModel.prototype.registerCell = function (cell) {
        var row = this.rows.getItem(cell.logicalRowIndex);
        if (!row) {
            return;
        }
        var colIndex = cell.logicalColIndex;
        var modelCell = {
            uid: cell.uid,
            colIndex: colIndex,
            rowIndex: row.index,
            colSpan: cell.colSpan,
            rowSpan: cell.rowSpan,
            detailExpandCell: cell.detailExpandCell,
            dataItem: row.dataItem,
            dataRowIndex: row.dataRowIndex,
            focusGroup: cell.focusGroup
        };
        row.cells.setItem(colIndex, modelCell);
        if (cell.groupItem) {
            row.groupItem = cell.groupItem;
        }
        return modelCell;
    };
    NavigationModel.prototype.unregisterCell = function (index, rowIndex, cell) {
        var row = this.rows.getItem(rowIndex);
        if (row) {
            var match = row.cells.getItem(index);
            if (match && match.uid === cell.uid) {
                row.cells.removeItem(index);
            }
        }
    };
    NavigationModel.prototype.registerRow = function (row) {
        var modelRow = {
            uid: row.uid,
            index: row.logicalRowIndex,
            dataItem: row.dataItem,
            dataRowIndex: row.dataRowIndex,
            cells: new item_map_1.ItemMap()
        };
        this.rows.setItem(row.logicalRowIndex, modelRow);
    };
    NavigationModel.prototype.updateRow = function (row) {
        var current = this.rows.getItem(row.logicalRowIndex);
        if (current) {
            Object.assign(current, {
                dataItem: row.dataItem,
                dataRowIndex: row.dataRowIndex
            });
        }
    };
    NavigationModel.prototype.unregisterRow = function (index, row) {
        var match = this.rows.getItem(index);
        if (match && match.uid === row.uid) {
            this.rows.removeItem(index);
        }
    };
    NavigationModel.prototype.cellRange = function (cell) {
        if (cell) {
            var start = cell.colIndex;
            var end = cell.colIndex + (cell.colSpan || 1) - 1;
            return {
                start: start,
                end: end
            };
        }
        return {};
    };
    NavigationModel.prototype.rowRange = function (cell) {
        if (cell) {
            var start = cell.rowIndex;
            var end = cell.rowIndex + (cell.rowSpan || 1) - 1;
            return {
                start: start,
                end: end
            };
        }
        return {};
    };
    NavigationModel.prototype.nextRow = function (rowIndex, offset) {
        var rows = this.rows.toArray();
        var row = this.rows.getItem(rowIndex);
        var position = rows.indexOf(row);
        var next = rows[position + offset];
        return next;
    };
    NavigationModel.prototype.findRow = function (index) {
        return this.rows.getItem(index);
    };
    NavigationModel.prototype.findCell = function (index, row) {
        if (!row) {
            return;
        }
        var rowIndex = row.index;
        var cell = row.cells.getItem(index);
        var currentIndex = rowIndex;
        while (!cell && row) {
            row = this.rows.getItem(currentIndex);
            cell = this.rowCell(index, row);
            currentIndex--;
        }
        if (cell && rowIndex <= row.index + (cell.rowSpan || 1) - 1) {
            return cell;
        }
    };
    NavigationModel.prototype.rowCell = function (index, row) {
        if (!row || !row.cells.count) {
            return;
        }
        var firstCell = row.cells.first;
        var cell, currentIndex = index;
        while (!cell && currentIndex >= firstCell.colIndex) {
            cell = row.cells.getItem(currentIndex);
            currentIndex--;
        }
        if (cell && index <= cell.colIndex + (cell.colSpan || 1) - 1) {
            return cell;
        }
    };
    return NavigationModel;
}());
exports.NavigationModel = NavigationModel;
