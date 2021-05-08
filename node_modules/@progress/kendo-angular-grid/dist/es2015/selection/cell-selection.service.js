/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
import { iterator } from '../utils';
import { isPresent } from '../utils';
import { DomEventsService } from '../common/dom-events.service';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
import { NavigationService } from '../navigation/navigation.service';
/**
 * @hidden
 */
export class CellSelectionService {
    constructor(domEvents, localDataChangesService, navigationService) {
        this.domEvents = domEvents;
        this.localDataChangesService = localDataChangesService;
        this.navigationService = navigationService;
        this.changes = new EventEmitter();
        this.mouseUpEvent = new EventEmitter();
        this.currentSelection = [];
        this.active = false;
        this.dragging = false;
        this.dragSelectDeselect = false;
        this.lastSelectionItem = { itemKey: 0, columnKey: 0 };
        this.lastSelectionItemRowIndex = 0;
        this.lastSelectionItemColIndex = 0;
        this.addSubscriptions();
    }
    get enableMarquee() {
        const checkboxOnly = this.settings && typeof this.settings === 'object' && this.settings.checkboxOnly;
        if (!this.settings || checkboxOnly) {
            return false;
        }
        const selectableSettings = this.settings.selectable;
        const dragAndMultiple = typeof (selectableSettings) === 'object' &&
            isPresent(selectableSettings) &&
            selectableSettings.mode === 'multiple' &&
            selectableSettings.cell &&
            selectableSettings.enabled !== false &&
            selectableSettings.drag;
        return this.active && dragAndMultiple;
    }
    init(settings) {
        this.settings = settings;
        this.currentSelection = [];
        if (settings.selectable && settings.selectable.enabled !== false) {
            const iterator = this.getIterator();
            let item = iterator.next();
            while (!item.done) {
                if (item.value && item.value.type === "data") {
                    const rowArgs = {
                        dataItem: item.value.data,
                        index: item.value.index
                    };
                    settings.columns.forEach(col => {
                        const selectedCellArgs = settings.cellSelected(rowArgs, col, col.leafIndex);
                        if (selectedCellArgs.selected) {
                            this.currentSelection.push(selectedCellArgs.item);
                        }
                    });
                }
                item = iterator.next();
            }
        }
    }
    isCellSelected(item, col) {
        if (this.settings && this.active) {
            const selectedCellArgs = this.settings.cellSelected({ dataItem: item.data, index: item.index }, col, col.leafIndex);
            return this.options.enabled && selectedCellArgs.selected;
        }
        return false;
    }
    handleClick(item, event) {
        if (this.dragging) {
            this.dragging = false;
            return;
        }
        let ev;
        const ctrlKey = event.ctrlKey || event.metaKey;
        if (this.options.mode === "single" && ctrlKey && this.isCellSelected(item, item.column)) {
            ev = this.toggle(item);
        }
        else if (this.options.mode === "multiple") {
            if (ctrlKey && !event.shiftKey) {
                ev = this.toggle(item);
            }
            else if (event.shiftKey) {
                const startRowIndex = Math.min(this.lastSelectionItemRowIndex, item.index);
                const startColIndex = Math.min(this.lastSelectionItemColIndex, item.column.leafIndex);
                const endRowIndex = Math.max(this.lastSelectionItemRowIndex, item.index);
                const endColIndex = Math.max(this.lastSelectionItemColIndex, item.column.leafIndex);
                ev = this.selectRange(startRowIndex, startColIndex, endRowIndex, endColIndex);
            }
        }
        if (!isPresent(ev)) {
            ev = this.select(item);
            this.currentSelection = [this.lastSelectionItem];
        }
        if (!ev.selectedCells.length && !ev.deselectedCells.length) {
            return;
        }
        ev.ctrlKey = ctrlKey;
        ev.shiftKey = event.shiftKey;
        this.changes.emit(ev);
    }
    toggle(item) {
        let selectedCells = [];
        let deselectedCells = [];
        this.lastSelectionItem =
            this.settings.cellSelected({ dataItem: item.data, index: item.index }, item.column, item.column.leafIndex).item;
        this.lastSelectionItemRowIndex = item.index;
        this.lastSelectionItemColIndex = item.column.leafIndex;
        if (this.isCellSelected(item, item.column)) {
            deselectedCells.push(this.lastSelectionItem);
        }
        else {
            selectedCells.push(this.lastSelectionItem);
        }
        return {
            deselectedCells,
            selectedCells
        };
    }
    select(item) {
        const selectedCells = [];
        const deselectedCells = [];
        this.lastSelectionItem =
            this.settings.cellSelected({ dataItem: item.data, index: item.index }, item.column, item.column.leafIndex).item;
        this.lastSelectionItemRowIndex = item.index;
        this.lastSelectionItemColIndex = item.column.leafIndex;
        if (!this.isCellSelected(item, item.column)) {
            selectedCells.push(this.lastSelectionItem);
        }
        this.currentSelection.forEach((selectedItem) => {
            if (selectedItem.itemKey !== this.lastSelectionItem.itemKey || selectedItem.columnKey !== this.lastSelectionItem.columnKey) {
                deselectedCells.push(selectedItem);
            }
        });
        return {
            deselectedCells,
            selectedCells
        };
    }
    //Used to manually deselect removed items
    deselect(removedItem) {
        const iterator = this.getIterator();
        let item = iterator.next();
        let rowArgs;
        while (!item.done) {
            if (item.value && item.value.type === "data" && item.value.data === removedItem) {
                rowArgs = {
                    dataItem: item.value.data,
                    index: item.value.index
                };
                break;
            }
            item = iterator.next();
        }
        if (rowArgs) {
            const cellsToRemove = this.currentSelection.filter(selectedItem => {
                const contender = this.settings.cellSelected(rowArgs, null, null).item;
                return selectedItem.itemKey === contender.itemKey;
            });
            if (cellsToRemove.length) {
                let ev = {
                    ctrlKey: false,
                    deselectedCells: cellsToRemove,
                    selectedCells: []
                };
                this.changes.emit(ev);
            }
        }
    }
    selectRange(startRowIndex, startColIndex, endRowIndex, endColIndex) {
        const selectedCells = [];
        const deselectedCells = [];
        const selectionStartRow = Math.min(startRowIndex, endRowIndex);
        const selectionStartCol = Math.min(startColIndex, endColIndex);
        const selectionEndRow = Math.max(startRowIndex, endRowIndex);
        const selectionEndCol = Math.max(startColIndex, endColIndex);
        const iterator = this.getIterator();
        let next = iterator.next();
        while (!next.done) {
            if (next.value && next.value.type === "data") {
                const idx = next.value.index;
                const data = next.value.data;
                const rowArgs = {
                    dataItem: data,
                    index: idx
                };
                this.settings.columns.forEach(col => {
                    const { item } = this.settings.cellSelected(rowArgs, col, col.leafIndex);
                    const selected = this.isCellSelected(next.value, col);
                    const isInRowRange = selectionStartRow <= idx && idx <= selectionEndRow;
                    const isInColRange = selectionStartCol <= col.leafIndex && col.leafIndex <= selectionEndCol;
                    const isInSelectionRect = isInRowRange && isInColRange;
                    if (!isInSelectionRect && selected) {
                        deselectedCells.push(item);
                    }
                    if (isInSelectionRect && !selected) {
                        selectedCells.push(item);
                    }
                });
            }
            next = iterator.next();
        }
        return {
            deselectedCells,
            selectedCells
        };
    }
    get options() {
        const defaultOptions = {
            checkboxOnly: false,
            enabled: true,
            mode: "multiple"
        };
        if (!isPresent(this.settings)) {
            return defaultOptions;
        }
        if (typeof this.settings.selectable === 'boolean') {
            return {
                checkboxOnly: false,
                enabled: this.settings.selectable,
                mode: "multiple"
            };
        }
        else {
            return Object.assign(defaultOptions, this.settings.selectable);
        }
    }
    ngOnDestroy() {
        this.removeSubscriptions();
    }
    addSubscriptions() {
        if (!this.cellClickSubscription) {
            this.cellClickSubscription = this.domEvents.cellClick.subscribe((args) => {
                if (this.options.enabled && !this.options.checkboxOnly && args.type !== 'contextmenu') {
                    if (this.active) {
                        this.handleClick({ index: args.rowIndex, data: args.dataItem, column: args.column }, args.originalEvent);
                    }
                }
            });
        }
        if (!this.mousedownSubscription) {
            this.mousedownSubscription = this.domEvents.cellMousedown.subscribe((args) => {
                this.mouseDownEventArgs = args;
                if (this.options.enabled && (!this.options.mode || this.options.mode === "multiple") &&
                    !this.options.checkboxOnly && args.originalEvent.shiftKey) {
                    if (this.active) {
                        args.originalEvent.preventDefault();
                        this.navigationService.focusCellByElement(args.originalEvent.target);
                    }
                }
            });
        }
        if (this.localDataChangesService && !this.dataChangedSubscription) {
            this.dataChangedSubscription = this.localDataChangesService.changes.subscribe((args) => {
                if (this.active) {
                    if (isPresent(args.action) && args.action === 'remove') {
                        this.deselect(args.item);
                    }
                }
            });
        }
    }
    getIterator() {
        const accessor = this.settings.view.accessor();
        if (!accessor) {
            return;
        }
        return accessor[iterator]();
    }
    removeSubscriptions() {
        if (this.cellClickSubscription) {
            this.cellClickSubscription.unsubscribe();
            this.cellClickSubscription = null;
        }
        if (this.mousedownSubscription) {
            this.mousedownSubscription.unsubscribe();
            this.mousedownSubscription = null;
        }
        if (this.dataChangedSubscription) {
            this.dataChangedSubscription.unsubscribe();
            this.dataChangedSubscription = null;
        }
    }
}
CellSelectionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CellSelectionService.ctorParameters = () => [
    { type: DomEventsService },
    { type: LocalDataChangesService },
    { type: NavigationService }
];
