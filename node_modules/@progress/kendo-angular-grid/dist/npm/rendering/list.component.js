/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var row_height_service_1 = require("../scrolling/row-height.service");
var scroller_service_1 = require("../scrolling/scroller.service");
var scroll_request_service_1 = require("../scrolling/scroll-request.service");
var column_base_1 = require("../columns/column-base");
var detail_template_directive_1 = require("./details/detail-template.directive");
var utils_1 = require("../utils");
var details_service_1 = require("./details/details.service");
var columns_container_1 = require("../columns/columns-container");
var change_notification_service_1 = require("../data/change-notification.service");
var row_sync_1 = require("../layout/row-sync");
var no_records_template_directive_1 = require("./no-records-template.directive");
var suspend_service_1 = require("../scrolling/suspend.service");
var groups_service_1 = require("../grouping/groups.service");
var column_common_1 = require("../columns/column-common");
var scroll_sync_service_1 = require("../scrolling/scroll-sync.service");
var resize_service_1 = require("../layout/resize.service");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var browser_support_service_1 = require("../layout/browser-support.service");
var edit_service_1 = require("../editing/edit.service");
var navigation_service_1 = require("../navigation/navigation.service");
var kendo_angular_common_2 = require("@progress/kendo-angular-common");
var column_resizing_service_1 = require("../column-resizing/column-resizing.service");
var constants_1 = require("../constants");
var default_track_by_1 = require("../common/default-track-by");
var dom_queries_1 = require("./common/dom-queries");
var pdf_service_1 = require("../pdf/pdf.service");
var column_info_service_1 = require("../common/column-info.service");
var constants_2 = require("./constants");
var elementAt = function (index, elements, elementOffset) {
    for (var idx = 0, elementIdx = 0; idx < elements.length; idx++) {
        var offset = elementOffset(elements[idx]);
        if (elementIdx <= index && index <= elementIdx + offset - 1) {
            return elements[idx];
        }
        elementIdx += offset;
    }
};
var ɵ0 = elementAt;
exports.ɵ0 = ɵ0;
var rowAt = function (index, rows) {
    return elementAt(index, rows, function (row) { return row.hasAttribute('data-kendo-grid-item-index') ? 1 : 0; });
};
var ɵ1 = rowAt;
exports.ɵ1 = ɵ1;
var cellAt = function (index, cells) {
    return elementAt(index, cells, function (cell) { return !dom_queries_1.hasClasses(cell, constants_2.NON_DATA_CELL_CLASSES) ? parseInt(cell.getAttribute('colSpan'), 10) || 1 : 0; });
};
var ɵ2 = cellAt;
exports.ɵ2 = ɵ2;
var EMPTY_OBJECT = {};
/**
 * @hidden
 */
exports.SCROLLER_FACTORY_TOKEN = new core_1.InjectionToken('grid-scroll-service-factory');
/**
 * @hidden
 */
function DEFAULT_SCROLLER_FACTORY(observable) {
    return new scroller_service_1.ScrollerService(observable);
}
exports.DEFAULT_SCROLLER_FACTORY = DEFAULT_SCROLLER_FACTORY;
var wheelDeltaY = function (e) {
    var deltaY = e.wheelDeltaY;
    if (e.wheelDelta && (deltaY === undefined || deltaY)) {
        return e.wheelDelta;
    }
    else if (e.detail && e.axis === e.VERTICAL_AXIS) {
        return (-e.detail) * 10;
    }
    return 0;
};
var ɵ3 = wheelDeltaY;
exports.ɵ3 = ɵ3;
var preventLockedScroll = function (args, element) {
    var delta = wheelDeltaY(args);
    var scrollTop = element.scrollTop;
    var allowScroll = (scrollTop === 0 && 0 < delta) || (element.scrollHeight <= element.offsetHeight + scrollTop && delta < 0);
    if (!allowScroll) {
        event.preventDefault();
    }
};
var ɵ4 = preventLockedScroll;
exports.ɵ4 = ɵ4;
var translateY = function (renderer, value) { return function (el) { return renderer.setStyle(el, "transform", "translateY(" + value + "px)"); }; };
var ɵ5 = translateY;
exports.ɵ5 = ɵ5;
var maybeNativeElement = function (el) { return el ? el.nativeElement : null; };
var ɵ6 = maybeNativeElement;
exports.ɵ6 = ɵ6;
var hasScrollbar = function (el, parent) { return el.nativeElement.offsetWidth > parent.nativeElement.clientWidth; };
var ɵ7 = hasScrollbar;
exports.ɵ7 = ɵ7;
var setHeight = function (renderer) { return function (_a) {
    var el = _a.el, height = _a.height;
    return renderer.setStyle(el, "height", height + "px");
}; };
var ɵ8 = setHeight;
exports.ɵ8 = ɵ8;
var bufferSize = 1;
/**
 * @hidden
 */
var ListComponent = /** @class */ (function () {
    function ListComponent(scrollerFactory, detailsService, changeNotification, suspendService, groupsService, ngZone, renderer, scrollSyncService, resizeService, editService, supportService, navigationService, scrollRequestService, localization, columnResizingService, changeDetector, pdfService, columnInfo) {
        var _this = this;
        this.changeNotification = changeNotification;
        this.suspendService = suspendService;
        this.groupsService = groupsService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.scrollSyncService = scrollSyncService;
        this.resizeService = resizeService;
        this.editService = editService;
        this.supportService = supportService;
        this.navigationService = navigationService;
        this.localization = localization;
        this.columnResizingService = columnResizingService;
        this.changeDetector = changeDetector;
        this.pdfService = pdfService;
        this.columnInfo = columnInfo;
        this.groups = [];
        this.skip = 0;
        this.columns = new columns_container_1.ColumnsContainer(function () { return []; });
        this.selectable = false;
        this.groupable = false;
        this.trackBy = default_track_by_1.defaultTrackBy;
        this.contentScroll = new core_1.EventEmitter();
        this.pageChange = new core_1.EventEmitter();
        this.scrollBottom = new core_1.EventEmitter();
        this.columnsStartIdx = 0;
        this.resizeSensors = new core_1.QueryList();
        this.dispatcher = new rxjs_1.Subject();
        this.containerScrollTop = 0;
        this.scrollLeft = 0;
        this.rtl = false;
        this.scroller = scrollerFactory(this.dispatcher);
        this.subscriptions =
            detailsService.changes.subscribe(function (x) { return _this.detailExpand(x); }).add(scrollRequestService.requests.subscribe(function (x) { return _this.scrollTo(x); }));
    }
    Object.defineProperty(ListComponent.prototype, "hostClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "hostRole", {
        get: function () {
            return 'presentation';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "showFooter", {
        get: function () {
            return this.groupable && this.groupable.showFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "totalWidth", {
        get: function () {
            if (this.virtualColumns && this.columns.unlockedWidth) {
                return this.columns.unlockedWidth;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "lockedLeafColumns", {
        get: function () {
            return this.columns.lockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "nonLockedLeafColumns", {
        get: function () {
            return this.columns.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "nonLockedColumnsToRender", {
        get: function () {
            if (this.virtualColumns && !this.pdfService.exporting) {
                return this.viewportColumns;
            }
            return this.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "leafColumns", {
        get: function () {
            return this.columns.leafColumnsToRender;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "lockedWidth", {
        get: function () {
            var groupCellsWidth = this.groups.length * constants_1.GROUP_CELL_WIDTH;
            return column_common_1.expandColumns(this.lockedLeafColumns.toArray()).reduce(function (prev, curr) { return prev + (curr.width || 0); }, groupCellsWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "nonLockedWidth", {
        get: function () {
            if ((!this.rtl && this.lockedLeafColumns.length) || this.virtualColumns) {
                return column_common_1.sumColumnWidths(column_common_1.expandColumns(this.nonLockedColumnsToRender.toArray()));
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "isLocked", {
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.init();
        this.subscriptions.add(this.ngZone.runOutsideAngular(this.handleRowSync.bind(this)));
        this.subscriptions.add(this.ngZone.runOutsideAngular(this.handleRowNavigationLocked.bind(this)));
        this.subscriptions.add(rxjs_1.merge(this.columns.changes, this.resizeService.changes).subscribe(function () {
            if (_this.virtualColumns) {
                _this.ngZone.run(function () {
                    _this.updateViewportColumns();
                    _this.changeDetector.markForCheck();
                });
            }
        }));
        this.subscriptions.add(this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.rtl = rtl;
        }));
    };
    ListComponent.prototype.ngOnChanges = function (changes) {
        var hasInitialSkip = changes.skip && changes.skip.firstChange && changes.skip.currentValue > 0;
        if (hasInitialSkip) {
            this.handleInitialScrollToSkip();
        }
        if (utils_1.isChanged("skip", changes) && !this.rebind) {
            this.skipScroll = true;
            this.container.nativeElement.scrollTop = this.rowHeightService.offset(this.skip);
        }
        if (utils_1.anyChanged(["total", "take"], changes)) {
            this.init();
        }
        this.rebind = false;
    };
    ListComponent.prototype.ngDoCheck = function () {
        if (this.virtualColumns && (!this.viewportColumns || this.viewportWidthChange())) {
            this.updateViewportColumns();
        }
    };
    ListComponent.prototype.ngAfterViewInit = function () {
        if (this.skip && this.isVirtual) {
            this.container.nativeElement.scrollTop = this.rowHeightService.offset(this.skip);
        }
        this.resetNavigationViewport();
        this.attachContainerScroll();
        this.initResizeService();
    };
    ListComponent.prototype.ngAfterViewChecked = function () {
        var isLocked = this.isLocked;
        if (isLocked && !this.hasLockedContainer) {
            this.syncRowsHeight();
        }
        this.hasLockedContainer = isLocked;
    };
    ListComponent.prototype.syncRowsHeight = function () {
        if (this.lockedContainer) {
            row_sync_1.syncRowsHeight(this.lockedTable.nativeElement, this.table.nativeElement);
        }
    };
    ListComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.resizeService) {
            this.resizeService.destroy();
        }
        this.cleanupScroller();
    };
    ListComponent.prototype.init = function () {
        if (this.suspendService.scroll) {
            return;
        }
        this.rowHeightService = new row_height_service_1.RowHeightService(this.total, this.rowHeight, this.detailRowHeight);
        this.totalHeight = this.rowHeightService.totalHeight();
        if (!utils_1.isUniversal()) {
            this.ngZone.runOutsideAngular(this.createScroller.bind(this));
        }
    };
    ListComponent.prototype.lockedScroll = function () {
        if (!this.suspendService.scroll) {
            var lockedScrollTop = this.lockedContainer.nativeElement.scrollTop;
            if (lockedScrollTop !== this.containerScrollTop) {
                this.container.nativeElement.scrollTop = this.containerScrollTop = lockedScrollTop;
            }
        }
    };
    ListComponent.prototype.lockedMousewheel = function (args) {
        if (!args.ctrlKey) {
            preventLockedScroll(args, this.container.nativeElement);
            var scrollDelta = wheelDeltaY(args);
            this.container.nativeElement.scrollTop -= scrollDelta;
        }
    };
    ListComponent.prototype.lockedKeydown = function (args) {
        if (args.keyCode === kendo_angular_common_2.Keys.PageDown || args.keyCode === kendo_angular_common_2.Keys.PageUp) {
            var dir = args.keyCode === kendo_angular_common_2.Keys.PageDown ? 1 : -1;
            var element = this.container.nativeElement;
            element.scrollTop += element.offsetHeight * dir * 0.8;
            args.preventDefault();
        }
    };
    ListComponent.prototype.detailExpand = function (_a) {
        var index = _a.index, expand = _a.expand;
        if (expand) {
            this.rowHeightService.expandDetail(index);
        }
        else {
            this.rowHeightService.collapseDetail(index);
        }
        this.totalHeight = this.rowHeightService.totalHeight();
        this.resetNavigationViewport();
    };
    ListComponent.prototype.attachContainerScroll = function () {
        var _this = this;
        if (utils_1.isUniversal()) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            _this.subscriptions.add(rxjs_1.fromEvent(_this.container.nativeElement, 'scroll').pipe(operators_1.map(function (event) { return event.target; }), operators_1.filter(function () { return !_this.suspendService.scroll; }), operators_1.tap(function (target) {
                _this.onContainerScroll(target);
                _this.resetNavigationViewport();
                if (_this.virtualColumns) {
                    _this.handleColumnScroll();
                }
                var rowViewport = _this.navigationService.viewport || EMPTY_OBJECT;
                var columnViewport = _this.navigationService.columnViewport || EMPTY_OBJECT;
                _this.contentScroll.emit({
                    scrollLeft: target.scrollLeft,
                    scrollTop: target.scrollTop,
                    startRow: rowViewport.firstItemIndex,
                    endRow: rowViewport.lastItemIndex,
                    startColumn: columnViewport.firstItemIndex,
                    endColumn: columnViewport.lastItemIndex
                });
            })).subscribe(_this.dispatcher));
        });
        this.scrollSyncService.registerEmitter(this.container.nativeElement, "body");
    };
    ListComponent.prototype.createScroller = function () {
        var _this = this;
        this.cleanupScroller();
        var observable = this.scroller
            .create(this.rowHeightService, this.skip, this.take, this.total);
        this.skipScroll = false;
        this.scrollerSubscription = observable.pipe(operators_1.filter(function (x) { return x instanceof scroller_service_1.PageAction; }), operators_1.filter(function () {
            var temp = _this.skipScroll;
            _this.skipScroll = false;
            return !temp;
        }), operators_1.tap(function () { return _this.rebind = true; }))
            .subscribe(function (x) { return _this.ngZone.run(function () { return _this.pageChange.emit(x); }); });
        this.scrollerSubscription.add(observable.pipe(operators_1.filter(function (x) { return x instanceof scroller_service_1.ScrollAction; }))
            .subscribe(this.scroll.bind(this)));
        this.scrollerSubscription.add(observable.pipe(operators_1.filter(function (x) { return x instanceof scroller_service_1.ScrollBottomAction; }))
            .subscribe(function () { return _this.scrollBottom.emit(); }));
    };
    ListComponent.prototype.scroll = function (_a) {
        var _b = _a.offset, offset = _b === void 0 ? 0 : _b;
        if (this.isVirtual) {
            [
                maybeNativeElement(this.table),
                maybeNativeElement(this.lockedTable)
            ].filter(utils_1.isPresent).forEach(translateY(this.renderer, offset));
        }
        this.resetNavigationViewport();
    };
    ListComponent.prototype.onContainerScroll = function (_a) {
        var scrollTop = _a.scrollTop;
        this.containerScrollTop = scrollTop;
        if (this.lockedContainer) {
            this.lockedContainer.nativeElement.scrollTop = scrollTop;
        }
    };
    ListComponent.prototype.handleInitialScrollToSkip = function () {
        var _this = this;
        var shouldScroll = function () { return _this.isVirtual && _this.skip > 0 && _this.total > 0; };
        var sub = this.changeNotification.changes
            .pipe(operators_1.filter(shouldScroll))
            .subscribe(function (_) {
            _this.scrollTo({ row: _this.skip });
            sub.unsubscribe();
        });
    };
    ListComponent.prototype.handleRowSync = function () {
        var _this = this;
        var isLocked = function () { return utils_1.isPresent(_this.lockedContainer); };
        var onStable = function () { return _this.ngZone.onStable.asObservable().pipe(operators_1.take(1)); };
        return rxjs_1.merge(this.changeNotification.changes, this.groupsService.changes
            .pipe(operators_1.filter(isLocked), operators_1.switchMapTo(onStable())), this.editService.changed, this.resizeService.changes, this.columnResizingService.changes
            .pipe(operators_1.filter(function (change) { return change.type === 'end'; })), this.supportService.changes)
            .pipe(operators_1.tap(function () { return _this.resetNavigationViewport(); }), operators_1.filter(isLocked))
            .subscribe(function () {
            var scrollTop = _this.container.nativeElement.scrollTop;
            var scrollLeft = _this.container.nativeElement.scrollLeft;
            _this.syncRowsHeight();
            _this.syncContainerHeight();
            _this.lockedContainer.nativeElement.scrollTop = _this.container.nativeElement.scrollTop = scrollTop;
            // fixes scroll left position in IE when editing
            _this.container.nativeElement.scrollLeft = scrollLeft;
            _this.resizeSensors.forEach(function (sensor) { return sensor.acceptSize(); });
        });
    };
    ListComponent.prototype.handleRowNavigationLocked = function () {
        var _this = this;
        return this.navigationService.changes.pipe(operators_1.filter(function () { return utils_1.isPresent(_this.lockedContainer); }), operators_1.delay(10)).subscribe(function (args) {
            if (_this.lockedLeafColumns.length <= args.prevColIndex && args.colIndex < _this.lockedLeafColumns.length) {
                var cell = _this.navigationService.activeCell;
                if (cell && cell.colIndex + cell.colSpan < args.prevColIndex) {
                    _this.container.nativeElement.scrollLeft = 0;
                }
            }
        });
    };
    ListComponent.prototype.scrollToVirtualRow = function (itemIndex) {
        if (utils_1.isPresent(this.detailTemplate)) {
            itemIndex = Math.floor(itemIndex / 2);
        }
        var offset = this.rowHeightService.offset(itemIndex);
        this.container.nativeElement.scrollTop = offset;
        this.resetNavigationViewport();
    };
    ListComponent.prototype.scrollTo = function (_a) {
        var row = _a.row, column = _a.column;
        if (utils_1.isNumber(row)) {
            if (this.isVirtual) {
                this.scrollToVirtualRow(row);
            }
            else {
                var element = rowAt(row, this.table.nativeElement.rows);
                if (element) {
                    this.container.nativeElement.scrollTop = element.offsetTop;
                }
            }
        }
        if (utils_1.isNumber(column)) {
            column -= this.lockedLeafColumns.length;
            if (this.virtualColumns) {
                var columns = this.columns.leafColumnsToRender;
                var offset = 0;
                for (var idx = 0; idx < column; idx++) {
                    offset += columns[idx].width || 0;
                }
                var startOffset = this.lockedLeafColumns.length ? 0 : this.groups.length * constants_1.GROUP_CELL_WIDTH + (this.detailTemplate && column > 0 ? constants_1.GROUP_CELL_WIDTH : 0);
                this.container.nativeElement.scrollLeft = this.normalizeScrollLeft(offset + startOffset);
            }
            else if (column === 0 && this.detailTemplate) {
                this.container.nativeElement.scrollLeft = this.normalizeScrollLeft(0);
            }
            else {
                var firstRow = rowAt(0, this.table.nativeElement.rows);
                if (firstRow) {
                    var element = cellAt(column, firstRow.cells);
                    if (element) {
                        this.container.nativeElement.scrollLeft = this.elementScrollLeft(element);
                    }
                }
            }
        }
    };
    ListComponent.prototype.resetNavigationViewport = function () {
        if (!this.container || !this.navigationService.enabled ||
            !this.navigationService.needsViewport() || this.data.length === 0) {
            return;
        }
        var _a = this.container.nativeElement, scrollTop = _a.scrollTop, offsetHeight = _a.offsetHeight;
        var scrollBottom = scrollTop + offsetHeight;
        var firstItemIndex = this.rowHeightService.index(scrollTop);
        var lastItemIndex = this.rowHeightService.index(scrollBottom);
        var lastItemOffset = this.rowHeightService.offset(lastItemIndex);
        var lastItemOverflows = lastItemOffset + this.rowHeight > scrollBottom;
        if (lastItemIndex > 0 && lastItemOverflows) {
            lastItemIndex--;
        }
        var viewportStart = firstItemIndex;
        var viewportEnd = lastItemIndex;
        if (utils_1.isPresent(this.detailTemplate)) {
            viewportStart *= 2;
            viewportEnd *= 2;
            var firstItemHeight = this.rowHeightService.offset(firstItemIndex);
            if (firstItemHeight + this.rowHeight < scrollTop) {
                viewportStart++;
            }
            var lastItemHeight = this.rowHeightService.height(lastItemIndex);
            var lastItemExpanded = this.rowHeightService.isExpanded(lastItemIndex);
            var lastItemDetailOverflows = lastItemOffset + lastItemHeight > scrollBottom;
            if (lastItemExpanded && !lastItemDetailOverflows) {
                viewportEnd++;
            }
        }
        this.navigationService.setViewport(viewportStart, viewportEnd);
    };
    ListComponent.prototype.cleanupScroller = function () {
        if (this.scrollerSubscription) {
            this.scrollerSubscription.unsubscribe();
        }
        if (this.scroller) {
            this.scroller.destroy();
        }
    };
    ListComponent.prototype.initResizeService = function () {
        this.resizeService.connect(rxjs_1.merge.apply(void 0, this.resizeSensors.map(function (sensor) { return sensor.resize; })));
    };
    ListComponent.prototype.syncContainerHeight = function () {
        var _this = this;
        [maybeNativeElement(this.lockedContainer)]
            .filter(utils_1.isPresent)
            .map(function (el) {
            el.style.height = '';
            var height = _this.container.nativeElement.offsetHeight;
            if (hasScrollbar(_this.table, _this.container)) {
                height -= _this.supportService.scrollbarWidth;
            }
            return { el: el, height: height };
        })
            .forEach(setHeight(this.renderer));
    };
    ListComponent.prototype.updateViewportColumns = function (range) {
        var columns = this.columns.nonLockedLeafColumns.toArray();
        var _a = range || this.calculateViewportColumns(), startIdx = _a.startIdx, endIdx = _a.endIdx, offset = _a.offset;
        var start = Math.max(0, startIdx - bufferSize);
        var end = Math.min(endIdx + bufferSize, columns.length - 1);
        if (start < startIdx) {
            for (var idx = startIdx - 1; idx >= start; idx--) {
                offset -= columns[idx].width;
            }
        }
        var currentColumns = columns.slice(start, end + 1);
        this.viewportColumnsWidth = currentColumns.reduce(function (total, column) { return total + column.width; }, 0);
        if (start > 0) {
            var offsetColumn = new column_base_1.ColumnBase();
            offsetColumn.width = offset;
            currentColumns.unshift(offsetColumn);
        }
        this.viewportColumns = new core_1.QueryList();
        this.viewportColumns.reset(currentColumns);
        this.columnsStartIdx = start;
        this.columnsEndIdx = end;
        this.columnInfo.columnRangeChange.emit({ start: start, end: end, offset: offset });
        if (!range) {
            this.updateColumnViewport(startIdx, endIdx);
        }
    };
    ListComponent.prototype.handleColumnScroll = function () {
        var _this = this;
        var container = this.container.nativeElement;
        var scrollLeft = container.scrollLeft;
        if (this.scrollLeft !== scrollLeft) {
            this.scrollLeft = scrollLeft;
            var range_1 = this.calculateViewportColumns();
            this.updateColumnViewport(range_1.startIdx, range_1.endIdx);
            if (range_1.startIdx < this.columnsStartIdx || this.columnsEndIdx < range_1.endIdx) {
                utils_1.cancelAnimationFrame(this.columnUpdateFrame);
                this.columnUpdateFrame = utils_1.requestAnimationFrame(function () {
                    _this.ngZone.run(function () {
                        _this.updateViewportColumns(range_1);
                        _this.changeDetector.markForCheck();
                    });
                });
            }
        }
    };
    ListComponent.prototype.updateColumnViewport = function (startIdx, endIdx) {
        var lockedCount = this.lockedLeafColumns.length;
        var leafColumns = this.nonLockedLeafColumns.toArray();
        var viewportStart = lockedCount + startIdx + (this.detailTemplate && startIdx > 0 ? 1 : 0);
        var viewportEnd = lockedCount + endIdx + (this.detailTemplate ? 1 : 0);
        for (var idx = 0; idx < leafColumns.length; idx++) {
            var column = leafColumns[idx];
            if (column.isSpanColumn) {
                viewportEnd += column.childColumns.length;
            }
        }
        this.navigationService.setColumnViewport(viewportStart, viewportEnd);
    };
    ListComponent.prototype.calculateViewportColumns = function () {
        var _a = this.container.nativeElement, scrollLeft = _a.scrollLeft, clientWidth = _a.clientWidth;
        var columns = this.columns.nonLockedLeafColumns.toArray();
        var normalizedScrollLeft = this.normalizeScrollLeft(scrollLeft);
        var viewportEnd = normalizedScrollLeft + clientWidth;
        var startIdx;
        var endIdx = 0;
        var current = 0;
        var offset = 0;
        var idx;
        for (idx = 0; idx < columns.length; idx++) {
            var column = columns[idx];
            current += column.width || 0;
            if (startIdx === undefined && current > normalizedScrollLeft) {
                startIdx = idx;
                offset = current - (column.width || 0);
            }
            if (current >= viewportEnd) {
                endIdx = idx;
                break;
            }
        }
        if (!endIdx && idx > 0) {
            endIdx = columns.length - 1;
        }
        return { startIdx: startIdx, endIdx: endIdx, offset: offset };
    };
    ListComponent.prototype.viewportWidthChange = function () {
        var currentWidth = this.viewportColumns.toArray().reduce(function (total, column) { return total + column.width; }, 0);
        return currentWidth !== this.viewportColumnsWidth;
    };
    ListComponent.prototype.normalizeScrollLeft = function (position) {
        return this.rtl ? dom_queries_1.rtlScrollPosition(position, this.container.nativeElement, this.supportService.rtlScrollLeft) : position;
    };
    ListComponent.prototype.elementScrollLeft = function (element) {
        if (this.rtl) {
            return this.normalizeScrollLeft(this.container.nativeElement.scrollWidth - element.offsetLeft - element.offsetWidth);
        }
        return element.offsetLeft;
    };
    ListComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: exports.SCROLLER_FACTORY_TOKEN,
                            useValue: DEFAULT_SCROLLER_FACTORY
                        }
                    ],
                    selector: 'kendo-grid-list',
                    template: "\n    <div #lockedContainer class=\"k-grid-content-locked\" role=\"presentation\"\n        *ngIf=\"isLocked\" [style.width.px]=\"lockedWidth\"\n        [kendoEventsOutsideAngular]=\"{\n            keydown: lockedKeydown,\n            scroll: lockedScroll,\n            mousewheel: lockedMousewheel,\n            DOMMouseScroll: lockedMousewheel\n        }\"\n        [scope]=\"this\"\n        >\n        <div role=\"presentation\" class=\"k-grid-table-wrap\">\n            <table [locked]=\"true\" #lockedTable class=\"k-grid-table\" role=\"presentation\" [style.width.px]=\"lockedWidth\">\n                <colgroup kendoGridColGroup\n                    role=\"presentation\"\n                    [groups]=\"groups\"\n                    [columns]=\"lockedLeafColumns\"\n                    [detailTemplate]=\"detailTemplate\">\n                </colgroup>\n                <tbody kendoGridTableBody\n                    role=\"presentation\"\n                    [groups]=\"groups\"\n                    [isLocked]=\"true\"\n                    [data]=\"data\"\n                    [noRecordsText]=\"''\"\n                    [columns]=\"lockedLeafColumns\"\n                    [totalColumnsCount]=\"leafColumns.length\"\n                    [detailTemplate]=\"detailTemplate\"\n                    [showGroupFooters]=\"showFooter\"\n                    [skip]=\"skip\"\n                    [selectable]=\"selectable\"\n                    [trackBy]=\"trackBy\"\n                    [filterable]=\"filterable\"\n                    [rowClass]=\"rowClass\">\n                </tbody>\n            </table>\n            <kendo-resize-sensor></kendo-resize-sensor>\n        </div>\n        <div class=\"k-height-container\" role=\"presentation\">\n            <div [style.height.px]=\"totalHeight\"></div>\n        </div>\n    </div><div #container\n               class=\"k-grid-content k-virtual-content\"\n               role=\"presentation\" tabindex=\"-1\"\n               [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n               [lockedWidth]=\"lockedWidth + 1\">\n        <div role=\"presentation\" class=\"k-grid-table-wrap\">\n            <table [style.width.px]=\"nonLockedWidth\" #table [virtualColumns]=\"virtualColumns\"\n              class=\"k-grid-table\" role=\"presentation\">\n                <colgroup kendoGridColGroup\n                    role=\"presentation\"\n                    [groups]=\"isLocked ? [] : groups\"\n                    [columns]=\"nonLockedColumnsToRender\"\n                    [detailTemplate]=\"detailTemplate\">\n                </colgroup>\n                <tbody kendoGridTableBody\n                    role=\"presentation\"\n                    [skipGroupDecoration]=\"isLocked\"\n                    [data]=\"data\"\n                    [groups]=\"groups\"\n                    [showGroupFooters]=\"showFooter\"\n                    [columns]=\"nonLockedColumnsToRender\"\n                    [allColumns]=\"nonLockedLeafColumns\"\n                    [detailTemplate]=\"detailTemplate\"\n                    [noRecordsTemplate]=\"noRecordsTemplate\"\n                    [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                    [totalColumnsCount]=\"leafColumns.length\"\n                    [skip]=\"skip\"\n                    [selectable]=\"selectable\"\n                    [trackBy]=\"trackBy\"\n                    [filterable]=\"filterable\"\n                    [rowClass]=\"rowClass\"\n                    [virtualColumns]=\"virtualColumns\">\n                </tbody>\n            </table>\n            <kendo-resize-sensor *ngIf=\"isLocked\"></kendo-resize-sensor>\n        </div>\n        <kendo-resize-sensor *ngIf=\"isLocked || virtualColumns\"></kendo-resize-sensor>\n        <div class=\"k-height-container\" role=\"presentation\">\n            <div [style.height.px]=\"totalHeight\"></div>\n        </div>\n        <div *ngIf=\"virtualColumns\" class=\"k-width-container\" role=\"presentation\">\n            <div [style.width.px]=\"totalWidth\"></div>\n        </div>\n    </div>\n    <div *ngIf=\"loading\" kendoGridLoading>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.SCROLLER_FACTORY_TOKEN,] }] },
        { type: details_service_1.DetailsService },
        { type: change_notification_service_1.ChangeNotificationService },
        { type: suspend_service_1.SuspendService },
        { type: groups_service_1.GroupsService },
        { type: core_1.NgZone },
        { type: core_1.Renderer2 },
        { type: scroll_sync_service_1.ScrollSyncService },
        { type: resize_service_1.ResizeService },
        { type: edit_service_1.EditService },
        { type: browser_support_service_1.BrowserSupportService },
        { type: navigation_service_1.NavigationService },
        { type: scroll_request_service_1.ScrollRequestService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: column_resizing_service_1.ColumnResizingService },
        { type: core_1.ChangeDetectorRef },
        { type: pdf_service_1.PDFService },
        { type: column_info_service_1.ColumnInfoService }
    ]; };
    ListComponent.propDecorators = {
        hostClass: [{ type: core_1.HostBinding, args: ["class.k-grid-container",] }],
        hostRole: [{ type: core_1.HostBinding, args: ["attr.role",] }],
        data: [{ type: core_1.Input }],
        groups: [{ type: core_1.Input }],
        total: [{ type: core_1.Input }],
        rowHeight: [{ type: core_1.Input }],
        detailRowHeight: [{ type: core_1.Input }],
        take: [{ type: core_1.Input }],
        skip: [{ type: core_1.Input }],
        columns: [{ type: core_1.Input }],
        detailTemplate: [{ type: core_1.Input }],
        noRecordsTemplate: [{ type: core_1.Input }],
        selectable: [{ type: core_1.Input }],
        groupable: [{ type: core_1.Input }],
        filterable: [{ type: core_1.Input }],
        rowClass: [{ type: core_1.Input }],
        loading: [{ type: core_1.Input }],
        trackBy: [{ type: core_1.Input }],
        virtualColumns: [{ type: core_1.Input }],
        isVirtual: [{ type: core_1.Input }],
        contentScroll: [{ type: core_1.Output }],
        pageChange: [{ type: core_1.Output }],
        scrollBottom: [{ type: core_1.Output }],
        container: [{ type: core_1.ViewChild, args: ["container", { static: true },] }],
        lockedContainer: [{ type: core_1.ViewChild, args: ["lockedContainer",] }],
        lockedTable: [{ type: core_1.ViewChild, args: ["lockedTable",] }],
        table: [{ type: core_1.ViewChild, args: ["table",] }],
        resizeSensors: [{ type: core_1.ViewChildren, args: [kendo_angular_common_1.ResizeSensorComponent,] }]
    };
    return ListComponent;
}());
exports.ListComponent = ListComponent;
