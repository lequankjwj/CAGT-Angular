/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from 'rxjs';
/**
 * @hidden
 */
var NavigationCursor = /** @class */ (function () {
    function NavigationCursor(model) {
        this.model = model;
        this.changes = new Subject();
        this.activeRow = 0;
        this.activeCol = 0;
        this.virtualCol = 0;
        this.virtualRow = 0;
    }
    Object.defineProperty(NavigationCursor.prototype, "row", {
        get: function () {
            return this.model.findRow(this.activeRow);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationCursor.prototype, "cell", {
        get: function () {
            var row = this.row;
            if (row) {
                return this.model.findCell(this.activeCol, row);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationCursor.prototype, "dataRowIndex", {
        get: function () {
            var row = this.row;
            if (row) {
                return row.dataRowIndex;
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Assumes and announces a new cursor position.
     */
    NavigationCursor.prototype.reset = function (rowIndex, colIndex, force) {
        if (rowIndex === void 0) { rowIndex = this.activeRow; }
        if (colIndex === void 0) { colIndex = this.activeCol; }
        if (force === void 0) { force = true; }
        if (this.activate(rowIndex, colIndex, force)) {
            this.virtualRow = rowIndex;
            this.virtualCol = colIndex;
        }
    };
    NavigationCursor.prototype.activate = function (rowIndex, colIndex, force) {
        if (!force && this.isActiveRange(rowIndex, colIndex)) {
            return false;
        }
        var prevColIndex = this.activeCol;
        var prevRowIndex = this.activeRow;
        this.activeCol = colIndex;
        this.activeRow = rowIndex;
        this.changes.next({
            colIndex: colIndex,
            prevColIndex: prevColIndex,
            prevRowIndex: prevRowIndex,
            rowIndex: rowIndex
        });
        return true;
    };
    NavigationCursor.prototype.isActiveRange = function (rowIndex, colIndex) {
        if (this.activeRow !== rowIndex) {
            return false;
        }
        var cell = this.cell;
        var _a = this.model.cellRange(cell), start = _a.start, end = _a.end;
        return !Boolean(cell) || (start <= colIndex && colIndex <= end);
    };
    /**
     * Assumes a new cursor position without announcing it.
     */
    NavigationCursor.prototype.assume = function (rowIndex, colIndex) {
        if (rowIndex === void 0) { rowIndex = this.activeRow; }
        if (colIndex === void 0) { colIndex = this.activeCol; }
        this.virtualRow = rowIndex;
        this.virtualCol = colIndex;
        this.activeCol = colIndex;
        this.activeRow = rowIndex;
    };
    /**
     * Announces a current cursor position to subscribers.
     */
    NavigationCursor.prototype.announce = function () {
        this.changes.next({
            colIndex: this.activeCol,
            prevColIndex: this.activeCol,
            prevRowIndex: this.activeRow,
            rowIndex: this.activeRow
        });
    };
    NavigationCursor.prototype.activateVirtualCell = function (cell) {
        var rowRange = this.model.rowRange(cell);
        var cellRange = this.model.cellRange(cell);
        var activeCol = this.activeCol;
        var activeRow = this.activeRow;
        if (rowRange.start <= activeRow && activeRow <= rowRange.end &&
            cellRange.start <= activeCol && activeCol <= cellRange.end) {
            this.activeRow = cell.rowIndex;
            this.activeCol = cell.colIndex;
            return true;
        }
    };
    NavigationCursor.prototype.isActive = function (rowIndex, colIndex) {
        return this.activeCol === colIndex && this.activeRow === rowIndex;
    };
    NavigationCursor.prototype.moveUp = function (offset) {
        if (offset === void 0) { offset = 1; }
        return this.offsetRow(-offset);
    };
    NavigationCursor.prototype.moveDown = function (offset) {
        if (offset === void 0) { offset = 1; }
        return this.offsetRow(offset);
    };
    NavigationCursor.prototype.moveLeft = function (offset) {
        if (offset === void 0) { offset = 1; }
        return this.offsetCol(-offset);
    };
    NavigationCursor.prototype.moveRight = function (offset) {
        if (offset === void 0) { offset = 1; }
        return this.offsetCol(offset);
    };
    NavigationCursor.prototype.lastCellIndex = function () {
        return this.metadata.columns.leafColumnsToRender.length - 1;
    };
    NavigationCursor.prototype.offsetCol = function (offset) {
        var prevRow = this.model.findRow(this.virtualRow);
        var lastIndex = this.lastCellIndex();
        var virtualCol = this.virtualCol;
        this.virtualCol = Math.max(0, Math.min(virtualCol + offset, lastIndex));
        var nextColIndex = this.virtualCol;
        var nextRowIndex = this.virtualRow;
        var cell = this.model.findCell(this.virtualCol, prevRow);
        if (!cell && this.metadata.virtualColumns) {
            return this.activate(nextRowIndex, nextColIndex);
        }
        if (cell.colSpan > 1 && cell.colIndex <= virtualCol && virtualCol < cell.colIndex + cell.colSpan) {
            nextColIndex = offset > 0 ? Math.min(cell.colIndex + cell.colSpan, lastIndex) : Math.max(0, cell.colIndex + offset);
            var nextCell = this.model.findCell(nextColIndex, prevRow);
            if (cell !== nextCell) {
                cell = nextCell;
                this.virtualCol = cell.colIndex;
            }
            else {
                this.virtualCol = virtualCol;
            }
        }
        return this.activate(cell.rowIndex, cell.colIndex);
    };
    NavigationCursor.prototype.offsetRow = function (offset) {
        var nextColIndex = this.virtualCol;
        if (this.metadata && this.metadata.isVirtual) {
            var maxIndex = this.metadata.maxLogicalRowIndex;
            var nextIndex = Math.max(0, Math.min(this.activeRow + offset, maxIndex));
            var nextRow_1 = this.model.findRow(nextIndex);
            if (nextRow_1) {
                // remove duplication
                var cell_1 = this.model.findCell(this.virtualCol, nextRow_1);
                if (cell_1.rowIndex <= this.virtualRow && offset > 0 && cell_1.rowSpan > 1) {
                    cell_1 = this.model.findCell(this.virtualCol, this.model.findRow(cell_1.rowIndex + cell_1.rowSpan - 1 + offset));
                }
                nextIndex = cell_1.rowIndex;
                nextColIndex = cell_1.colIndex;
            }
            this.virtualRow = nextIndex;
            return this.activate(nextIndex, nextColIndex);
        }
        var nextRow = this.model.findRow(this.virtualRow + offset) || this.model.nextRow(this.virtualRow, offset);
        if (!nextRow) {
            return false;
        }
        var cell = this.model.findCell(this.virtualCol, nextRow);
        if (cell && cell.rowIndex <= this.virtualRow && offset > 0 && cell.rowSpan > 1) { // spanned cell go to next
            var nextPos = cell.rowIndex + cell.rowSpan - 1 + offset;
            cell = this.model.findCell(this.virtualCol, this.model.findRow(nextPos));
        }
        if (!cell && this.metadata.virtualColumns) {
            return this.activate(this.virtualRow + offset, this.virtualCol);
        }
        this.virtualRow = cell.rowIndex;
        return this.activate(this.virtualRow, cell.colIndex);
    };
    return NavigationCursor;
}());
export { NavigationCursor };
