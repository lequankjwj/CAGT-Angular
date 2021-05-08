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
export class SelectionService {
    constructor(domEvents, localDataChangesService, navigationService) {
        this.domEvents = domEvents;
        this.localDataChangesService = localDataChangesService;
        this.navigationService = navigationService;
        this.changes = new EventEmitter();
        this.lastSelectionStartIndex = 0;
        this.currentSelection = [];
        this.selectAllChecked = false;
        this.active = false;
        this.dragging = false;
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
            selectableSettings.enabled !== false &&
            !selectableSettings.checkboxOnly &&
            selectableSettings.drag;
        return this.active && dragAndMultiple;
    }
    init(settings) {
        this.settings = settings;
        this.currentSelection = [];
        if (settings.selectable && settings.selectable.enabled !== false) {
            const iterator = this.getIterator();
            this._selectAllState = true;
            let item = iterator.next();
            while (!item.done) {
                if (item.value && item.value.type === "data") {
                    const rowArgs = {
                        dataItem: item.value.data,
                        index: item.value.index
                    };
                    if (settings.rowSelected(rowArgs)) {
                        this.currentSelection[item.value.index] = rowArgs;
                    }
                    else {
                        this._selectAllState = undefined;
                    }
                }
                item = iterator.next();
            }
            if (this.currentSelection.length === 0) {
                this._selectAllState = false;
            }
        }
    }
    isSelected(index) {
        if (this.settings && this.active) {
            return this.options.enabled && isPresent(this.currentSelection[index]);
        }
    }
    handleClick(item, event) {
        if (this.dragging) {
            this.dragging = false;
            return;
        }
        let ev;
        const ctrlKey = event.ctrlKey || event.metaKey;
        if (this.options.mode === "single" && ctrlKey && this.isSelected(item.index)) {
            ev = this.toggle(item);
        }
        else if (this.options.mode === "multiple") {
            if (ctrlKey && !event.shiftKey) {
                ev = this.toggle(item);
            }
            else if (event.shiftKey) {
                ev = this.addAllTo(item, ctrlKey);
            }
        }
        if (!isPresent(ev)) {
            ev = this.select(item);
            this.currentSelection[item.index] = {
                dataItem: item.data,
                index: item.index
            };
        }
        if (!ev.selectedRows.length && !ev.deselectedRows.length) {
            return;
        }
        ev.ctrlKey = ctrlKey;
        ev.shiftKey = event.shiftKey;
        this.changes.emit(ev);
    }
    toggle(item) {
        let selectedRows = [];
        let deselectedRows = [];
        this.lastSelectionStartIndex = item.index;
        const rowArgs = { dataItem: item.data, index: item.index };
        if (this.isSelected(item.index)) {
            deselectedRows.push(rowArgs);
        }
        else {
            selectedRows.push(rowArgs);
        }
        return {
            deselectedRows: deselectedRows,
            selectedRows: selectedRows
        };
    }
    toggleByIndex(index) {
        const iterator = this.getIterator();
        if (this.selectAllChecked && this.isSelected(index)) {
            this.selectAllChecked = false;
        }
        let item = iterator.next();
        while (!item.done) {
            if (item.value && item.value.type === "data" && item.value.index === index) {
                const itemToToggle = {
                    data: item.value.data,
                    index: item.value.index
                };
                if (this.isSelected(index) || this.options.mode === "multiple") {
                    return this.toggle(itemToToggle);
                }
                else {
                    return this.select(itemToToggle);
                }
            }
            item = iterator.next();
        }
    }
    select(item) {
        let deselectedRows = [];
        let selectedRows = [];
        this.lastSelectionStartIndex = item.index;
        if (!this.isSelected(item.index)) {
            selectedRows.push({ dataItem: item.data, index: item.index });
        }
        this.currentSelection.forEach((row) => {
            if (row.index !== item.index) {
                deselectedRows.push(row);
            }
        });
        return {
            deselectedRows: deselectedRows,
            selectedRows: selectedRows
        };
    }
    //Used to manually deselect removed items
    deselect(removedItem) {
        const iterator = this.getIterator();
        let item = iterator.next();
        while (!item.done) {
            if (item.value && item.value.type === "data" && item.value.data === removedItem) {
                const rowArgs = {
                    dataItem: item.value.data,
                    index: item.value.index
                };
                if (this.isSelected(rowArgs.index)) {
                    let ev = {
                        ctrlKey: false,
                        deselectedRows: [rowArgs],
                        selectedRows: []
                    };
                    this.changes.emit(ev);
                }
            }
            item = iterator.next();
        }
    }
    addAllTo(item, ctrlKey) {
        let selectedRows = [];
        let deselectedRows = [];
        const start = Math.min(this.lastSelectionStartIndex, item.index);
        const end = Math.max(this.lastSelectionStartIndex, item.index);
        const iterator = this.getIterator();
        let next = iterator.next();
        while (!next.done) {
            if (next.value && next.value.type === "data") {
                const idx = next.value.index;
                const rowArgs = { dataItem: next.value.data, index: idx };
                if ((idx < start || idx > end) && this.isSelected(idx) && !ctrlKey) {
                    deselectedRows.push(rowArgs);
                }
                if ((idx >= start && idx <= end) && !this.isSelected(idx)) {
                    selectedRows.push(rowArgs);
                }
            }
            next = iterator.next();
        }
        return {
            deselectedRows: deselectedRows,
            selectedRows: selectedRows
        };
    }
    updateAll(selectAllChecked) {
        this.selectAllChecked = selectAllChecked;
        let selectedRows = [];
        let deselectedRows = [];
        const iterator = this.getIterator();
        let next = iterator.next();
        while (!next.done) {
            if (next.value && next.value.type === "data") {
                const idx = next.value.index;
                const rowArgs = { dataItem: next.value.data, index: idx };
                if (this.isSelected(idx) && !selectAllChecked) {
                    deselectedRows.push(rowArgs);
                }
                if (!this.isSelected(idx) && selectAllChecked) {
                    selectedRows.push(rowArgs);
                }
            }
            next = iterator.next();
        }
        if (!selectedRows.length && !deselectedRows.length) {
            return;
        }
        let ev = {
            ctrlKey: true,
            deselectedRows: deselectedRows,
            selectedRows: selectedRows,
            shiftKey: true
        };
        this.changes.emit(ev);
    }
    selectRange(startIndex, endIndex) {
        let selectedRows = [];
        let deselectedRows = [];
        const start = Math.min(startIndex, endIndex);
        const end = Math.max(startIndex, endIndex);
        const iterator = this.getIterator();
        let next = iterator.next();
        while (!next.done) {
            if (next.value && next.value.type === "data") {
                const idx = next.value.index;
                const rowArgs = { dataItem: next.value.data, index: idx };
                if ((idx < start || idx > end) && this.isSelected(idx)) {
                    deselectedRows.push(rowArgs);
                }
                if ((idx >= start && idx <= end) && !this.isSelected(idx)) {
                    selectedRows.push(rowArgs);
                }
            }
            next = iterator.next();
        }
        return {
            deselectedRows: deselectedRows,
            selectedRows: selectedRows
        };
    }
    get selectAllState() {
        return this._selectAllState;
    }
    get selected() {
        return this.currentSelection.map((item) => {
            return item.index;
        }).filter((n) => typeof n === "number");
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
    targetArgs() {
        return {
            index: this.mouseDownEventArgs.rowIndex,
            dataItem: this.mouseDownEventArgs.dataItem
        };
    }
    addSubscriptions() {
        if (!this.cellClickSubscription) {
            this.cellClickSubscription = this.domEvents.cellClick.subscribe((args) => {
                if (this.options.enabled && !this.options.checkboxOnly && args.type !== 'contextmenu') {
                    if (this.active) {
                        this.handleClick({ index: args.rowIndex, data: args.dataItem }, args.originalEvent);
                    }
                }
            });
        }
        if (!this.mousedownSubscription) {
            this.mousedownSubscription = this.domEvents.cellMousedown.subscribe((args) => {
                this.mouseDownEventArgs = args;
                if ((this.options.enabled && (!this.options.mode || this.options.mode === "multiple") &&
                    !this.options.checkboxOnly && args.originalEvent.shiftKey)) {
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
SelectionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SelectionService.ctorParameters = () => [
    { type: DomEventsService },
    { type: LocalDataChangesService },
    { type: NavigationService }
];
