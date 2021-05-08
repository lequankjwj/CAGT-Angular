/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from 'rxjs';
/**
 * @hidden
 */
export class NavigationCursor {
    constructor(model) {
        this.model = model;
        this.changes = new Subject();
        this.activeRow = 0;
        this.activeCol = 0;
        this.virtualCol = 0;
        this.virtualRow = 0;
    }
    get row() {
        return this.model.findRow(this.activeRow);
    }
    get cell() {
        const row = this.row;
        if (row) {
            return this.model.findCell(this.activeCol, row);
        }
    }
    get dataRowIndex() {
        const row = this.row;
        if (row) {
            return row.dataRowIndex;
        }
        return -1;
    }
    /**
     * Assumes and announces a new cursor position.
     */
    reset(rowIndex = this.activeRow, colIndex = this.activeCol, force = true) {
        if (this.activate(rowIndex, colIndex, force)) {
            this.virtualRow = rowIndex;
            this.virtualCol = colIndex;
        }
    }
    activate(rowIndex, colIndex, force) {
        if (!force && this.isActiveRange(rowIndex, colIndex)) {
            return false;
        }
        const prevColIndex = this.activeCol;
        const prevRowIndex = this.activeRow;
        this.activeCol = colIndex;
        this.activeRow = rowIndex;
        this.changes.next({
            colIndex,
            prevColIndex,
            prevRowIndex,
            rowIndex
        });
        return true;
    }
    isActiveRange(rowIndex, colIndex) {
        if (this.activeRow !== rowIndex) {
            return false;
        }
        const cell = this.cell;
        const { start, end } = this.model.cellRange(cell);
        return !Boolean(cell) || (start <= colIndex && colIndex <= end);
    }
    /**
     * Assumes a new cursor position without announcing it.
     */
    assume(rowIndex = this.activeRow, colIndex = this.activeCol) {
        this.virtualRow = rowIndex;
        this.virtualCol = colIndex;
        this.activeCol = colIndex;
        this.activeRow = rowIndex;
    }
    /**
     * Announces a current cursor position to subscribers.
     */
    announce() {
        this.changes.next({
            colIndex: this.activeCol,
            prevColIndex: this.activeCol,
            prevRowIndex: this.activeRow,
            rowIndex: this.activeRow
        });
    }
    activateVirtualCell(cell) {
        const rowRange = this.model.rowRange(cell);
        const cellRange = this.model.cellRange(cell);
        const activeCol = this.activeCol;
        const activeRow = this.activeRow;
        if (rowRange.start <= activeRow && activeRow <= rowRange.end &&
            cellRange.start <= activeCol && activeCol <= cellRange.end) {
            this.activeRow = cell.rowIndex;
            this.activeCol = cell.colIndex;
            return true;
        }
    }
    isActive(rowIndex, colIndex) {
        return this.activeCol === colIndex && this.activeRow === rowIndex;
    }
    moveUp(offset = 1) {
        return this.offsetRow(-offset);
    }
    moveDown(offset = 1) {
        return this.offsetRow(offset);
    }
    moveLeft(offset = 1) {
        return this.offsetCol(-offset);
    }
    moveRight(offset = 1) {
        return this.offsetCol(offset);
    }
    lastCellIndex() {
        return this.metadata.columns.leafColumnsToRender.length - 1;
    }
    offsetCol(offset) {
        const prevRow = this.model.findRow(this.virtualRow);
        const lastIndex = this.lastCellIndex();
        const virtualCol = this.virtualCol;
        this.virtualCol = Math.max(0, Math.min(virtualCol + offset, lastIndex));
        let nextColIndex = this.virtualCol;
        let nextRowIndex = this.virtualRow;
        let cell = this.model.findCell(this.virtualCol, prevRow);
        if (!cell && this.metadata.virtualColumns) {
            return this.activate(nextRowIndex, nextColIndex);
        }
        if (cell.colSpan > 1 && cell.colIndex <= virtualCol && virtualCol < cell.colIndex + cell.colSpan) {
            nextColIndex = offset > 0 ? Math.min(cell.colIndex + cell.colSpan, lastIndex) : Math.max(0, cell.colIndex + offset);
            const nextCell = this.model.findCell(nextColIndex, prevRow);
            if (cell !== nextCell) {
                cell = nextCell;
                this.virtualCol = cell.colIndex;
            }
            else {
                this.virtualCol = virtualCol;
            }
        }
        return this.activate(cell.rowIndex, cell.colIndex);
    }
    offsetRow(offset) {
        let nextColIndex = this.virtualCol;
        if (this.metadata && this.metadata.isVirtual) {
            const maxIndex = this.metadata.maxLogicalRowIndex;
            let nextIndex = Math.max(0, Math.min(this.activeRow + offset, maxIndex));
            const nextRow = this.model.findRow(nextIndex);
            if (nextRow) {
                // remove duplication
                let cell = this.model.findCell(this.virtualCol, nextRow);
                if (cell.rowIndex <= this.virtualRow && offset > 0 && cell.rowSpan > 1) {
                    cell = this.model.findCell(this.virtualCol, this.model.findRow(cell.rowIndex + cell.rowSpan - 1 + offset));
                }
                nextIndex = cell.rowIndex;
                nextColIndex = cell.colIndex;
            }
            this.virtualRow = nextIndex;
            return this.activate(nextIndex, nextColIndex);
        }
        const nextRow = this.model.findRow(this.virtualRow + offset) || this.model.nextRow(this.virtualRow, offset);
        if (!nextRow) {
            return false;
        }
        let cell = this.model.findCell(this.virtualCol, nextRow);
        if (cell && cell.rowIndex <= this.virtualRow && offset > 0 && cell.rowSpan > 1) { // spanned cell go to next
            const nextPos = cell.rowIndex + cell.rowSpan - 1 + offset;
            cell = this.model.findCell(this.virtualCol, this.model.findRow(nextPos));
        }
        if (!cell && this.metadata.virtualColumns) {
            return this.activate(this.virtualRow + offset, this.virtualCol);
        }
        this.virtualRow = cell.rowIndex;
        return this.activate(this.virtualRow, cell.colIndex);
    }
}
