/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../utils");
var utils_2 = require("../utils");
var dom_events_service_1 = require("../common/dom-events.service");
var local_data_changes_service_1 = require("../editing/local-data-changes.service");
var navigation_service_1 = require("../navigation/navigation.service");
/**
 * @hidden
 */
var CellSelectionService = /** @class */ (function () {
    function CellSelectionService(domEvents, localDataChangesService, navigationService) {
        this.domEvents = domEvents;
        this.localDataChangesService = localDataChangesService;
        this.navigationService = navigationService;
        this.changes = new core_1.EventEmitter();
        this.mouseUpEvent = new core_1.EventEmitter();
        this.currentSelection = [];
        this.active = false;
        this.dragging = false;
        this.dragSelectDeselect = false;
        this.lastSelectionItem = { itemKey: 0, columnKey: 0 };
        this.lastSelectionItemRowIndex = 0;
        this.lastSelectionItemColIndex = 0;
        this.addSubscriptions();
    }
    Object.defineProperty(CellSelectionService.prototype, "enableMarquee", {
        get: function () {
            var checkboxOnly = this.settings && typeof this.settings === 'object' && this.settings.checkboxOnly;
            if (!this.settings || checkboxOnly) {
                return false;
            }
            var selectableSettings = this.settings.selectable;
            var dragAndMultiple = typeof (selectableSettings) === 'object' &&
                utils_2.isPresent(selectableSettings) &&
                selectableSettings.mode === 'multiple' &&
                selectableSettings.cell &&
                selectableSettings.enabled !== false &&
                selectableSettings.drag;
            return this.active && dragAndMultiple;
        },
        enumerable: true,
        configurable: true
    });
    CellSelectionService.prototype.init = function (settings) {
        var _this = this;
        this.settings = settings;
        this.currentSelection = [];
        if (settings.selectable && settings.selectable.enabled !== false) {
            var iterator_1 = this.getIterator();
            var item = iterator_1.next();
            var _loop_1 = function () {
                if (item.value && item.value.type === "data") {
                    var rowArgs_1 = {
                        dataItem: item.value.data,
                        index: item.value.index
                    };
                    settings.columns.forEach(function (col) {
                        var selectedCellArgs = settings.cellSelected(rowArgs_1, col, col.leafIndex);
                        if (selectedCellArgs.selected) {
                            _this.currentSelection.push(selectedCellArgs.item);
                        }
                    });
                }
                item = iterator_1.next();
            };
            while (!item.done) {
                _loop_1();
            }
        }
    };
    CellSelectionService.prototype.isCellSelected = function (item, col) {
        if (this.settings && this.active) {
            var selectedCellArgs = this.settings.cellSelected({ dataItem: item.data, index: item.index }, col, col.leafIndex);
            return this.options.enabled && selectedCellArgs.selected;
        }
        return false;
    };
    CellSelectionService.prototype.handleClick = function (item, event) {
        if (this.dragging) {
            this.dragging = false;
            return;
        }
        var ev;
        var ctrlKey = event.ctrlKey || event.metaKey;
        if (this.options.mode === "single" && ctrlKey && this.isCellSelected(item, item.column)) {
            ev = this.toggle(item);
        }
        else if (this.options.mode === "multiple") {
            if (ctrlKey && !event.shiftKey) {
                ev = this.toggle(item);
            }
            else if (event.shiftKey) {
                var startRowIndex = Math.min(this.lastSelectionItemRowIndex, item.index);
                var startColIndex = Math.min(this.lastSelectionItemColIndex, item.column.leafIndex);
                var endRowIndex = Math.max(this.lastSelectionItemRowIndex, item.index);
                var endColIndex = Math.max(this.lastSelectionItemColIndex, item.column.leafIndex);
                ev = this.selectRange(startRowIndex, startColIndex, endRowIndex, endColIndex);
            }
        }
        if (!utils_2.isPresent(ev)) {
            ev = this.select(item);
            this.currentSelection = [this.lastSelectionItem];
        }
        if (!ev.selectedCells.length && !ev.deselectedCells.length) {
            return;
        }
        ev.ctrlKey = ctrlKey;
        ev.shiftKey = event.shiftKey;
        this.changes.emit(ev);
    };
    CellSelectionService.prototype.toggle = function (item) {
        var selectedCells = [];
        var deselectedCells = [];
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
            deselectedCells: deselectedCells,
            selectedCells: selectedCells
        };
    };
    CellSelectionService.prototype.select = function (item) {
        var _this = this;
        var selectedCells = [];
        var deselectedCells = [];
        this.lastSelectionItem =
            this.settings.cellSelected({ dataItem: item.data, index: item.index }, item.column, item.column.leafIndex).item;
        this.lastSelectionItemRowIndex = item.index;
        this.lastSelectionItemColIndex = item.column.leafIndex;
        if (!this.isCellSelected(item, item.column)) {
            selectedCells.push(this.lastSelectionItem);
        }
        this.currentSelection.forEach(function (selectedItem) {
            if (selectedItem.itemKey !== _this.lastSelectionItem.itemKey || selectedItem.columnKey !== _this.lastSelectionItem.columnKey) {
                deselectedCells.push(selectedItem);
            }
        });
        return {
            deselectedCells: deselectedCells,
            selectedCells: selectedCells
        };
    };
    //Used to manually deselect removed items
    CellSelectionService.prototype.deselect = function (removedItem) {
        var _this = this;
        var iterator = this.getIterator();
        var item = iterator.next();
        var rowArgs;
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
            var cellsToRemove = this.currentSelection.filter(function (selectedItem) {
                var contender = _this.settings.cellSelected(rowArgs, null, null).item;
                return selectedItem.itemKey === contender.itemKey;
            });
            if (cellsToRemove.length) {
                var ev = {
                    ctrlKey: false,
                    deselectedCells: cellsToRemove,
                    selectedCells: []
                };
                this.changes.emit(ev);
            }
        }
    };
    CellSelectionService.prototype.selectRange = function (startRowIndex, startColIndex, endRowIndex, endColIndex) {
        var _this = this;
        var selectedCells = [];
        var deselectedCells = [];
        var selectionStartRow = Math.min(startRowIndex, endRowIndex);
        var selectionStartCol = Math.min(startColIndex, endColIndex);
        var selectionEndRow = Math.max(startRowIndex, endRowIndex);
        var selectionEndCol = Math.max(startColIndex, endColIndex);
        var iterator = this.getIterator();
        var next = iterator.next();
        var _loop_2 = function () {
            if (next.value && next.value.type === "data") {
                var idx_1 = next.value.index;
                var data = next.value.data;
                var rowArgs_2 = {
                    dataItem: data,
                    index: idx_1
                };
                this_1.settings.columns.forEach(function (col) {
                    var item = _this.settings.cellSelected(rowArgs_2, col, col.leafIndex).item;
                    var selected = _this.isCellSelected(next.value, col);
                    var isInRowRange = selectionStartRow <= idx_1 && idx_1 <= selectionEndRow;
                    var isInColRange = selectionStartCol <= col.leafIndex && col.leafIndex <= selectionEndCol;
                    var isInSelectionRect = isInRowRange && isInColRange;
                    if (!isInSelectionRect && selected) {
                        deselectedCells.push(item);
                    }
                    if (isInSelectionRect && !selected) {
                        selectedCells.push(item);
                    }
                });
            }
            next = iterator.next();
        };
        var this_1 = this;
        while (!next.done) {
            _loop_2();
        }
        return {
            deselectedCells: deselectedCells,
            selectedCells: selectedCells
        };
    };
    Object.defineProperty(CellSelectionService.prototype, "options", {
        get: function () {
            var defaultOptions = {
                checkboxOnly: false,
                enabled: true,
                mode: "multiple"
            };
            if (!utils_2.isPresent(this.settings)) {
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
        },
        enumerable: true,
        configurable: true
    });
    CellSelectionService.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    CellSelectionService.prototype.addSubscriptions = function () {
        var _this = this;
        if (!this.cellClickSubscription) {
            this.cellClickSubscription = this.domEvents.cellClick.subscribe(function (args) {
                if (_this.options.enabled && !_this.options.checkboxOnly && args.type !== 'contextmenu') {
                    if (_this.active) {
                        _this.handleClick({ index: args.rowIndex, data: args.dataItem, column: args.column }, args.originalEvent);
                    }
                }
            });
        }
        if (!this.mousedownSubscription) {
            this.mousedownSubscription = this.domEvents.cellMousedown.subscribe(function (args) {
                _this.mouseDownEventArgs = args;
                if (_this.options.enabled && (!_this.options.mode || _this.options.mode === "multiple") &&
                    !_this.options.checkboxOnly && args.originalEvent.shiftKey) {
                    if (_this.active) {
                        args.originalEvent.preventDefault();
                        _this.navigationService.focusCellByElement(args.originalEvent.target);
                    }
                }
            });
        }
        if (this.localDataChangesService && !this.dataChangedSubscription) {
            this.dataChangedSubscription = this.localDataChangesService.changes.subscribe(function (args) {
                if (_this.active) {
                    if (utils_2.isPresent(args.action) && args.action === 'remove') {
                        _this.deselect(args.item);
                    }
                }
            });
        }
    };
    CellSelectionService.prototype.getIterator = function () {
        var accessor = this.settings.view.accessor();
        if (!accessor) {
            return;
        }
        return accessor[utils_1.iterator]();
    };
    CellSelectionService.prototype.removeSubscriptions = function () {
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
    };
    CellSelectionService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    CellSelectionService.ctorParameters = function () { return [
        { type: dom_events_service_1.DomEventsService },
        { type: local_data_changes_service_1.LocalDataChangesService },
        { type: navigation_service_1.NavigationService }
    ]; };
    return CellSelectionService;
}());
exports.CellSelectionService = CellSelectionService;
