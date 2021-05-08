/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, NgZone, Renderer2, ElementRef } from '@angular/core';
import { DetailTemplateDirective } from './details/detail-template.directive';
import { GroupsService } from '../grouping/groups.service';
import { ChangeNotificationService } from '../data/change-notification.service';
import { isChanged, isPresent } from '../utils';
import { NoRecordsTemplateDirective } from './no-records-template.directive';
import { EditService } from '../editing/edit.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { columnsSpan, columnsToRender } from "../columns/column-common";
import { closest, closestInScope, hasClasses, isFocusableWithTabKey, matchesClasses, matchesNodeName } from './common/dom-queries';
import { DomEventsService } from '../common/dom-events.service';
import { SelectionService } from "../selection/selection.service";
import { ColumnInfoService } from "../common/column-info.service";
import { hasFilterRow } from '../filtering/filterable';
import { NavigationService } from '../navigation/navigation.service';
import { Keys } from '@progress/kendo-angular-common';
import { defaultTrackBy } from '../common/default-track-by';
import { DetailsService } from './details/details.service';
import { NON_DATA_CELL_CLASSES, NON_DATA_ROW_CLASSES, IGNORE_TARGET_CLASSSES, IGNORE_CONTAINER_CLASSES } from './constants';
import { CellSelectionService } from '../selection/cell-selection.service';
var columnCellIndex = function (cell, cells) {
    var cellIndex = 0;
    for (var idx = 0; idx < cells.length; idx++) {
        if (cells[idx] === cell) {
            return cellIndex;
        }
        if (!hasClasses(cells[idx], 'k-hierarchy-cell k-group-cell')) {
            cellIndex++;
        }
    }
};
var ɵ0 = columnCellIndex;
/**
 * @hidden
 */
var TableBodyComponent = /** @class */ (function () {
    function TableBodyComponent(detailsService, groupsService, changeNotification, editService, localization, ngZone, renderer, element, domEvents, selectionService, cellSelectionService, columnInfoService, navigationService) {
        var _this = this;
        this.detailsService = detailsService;
        this.groupsService = groupsService;
        this.changeNotification = changeNotification;
        this.editService = editService;
        this.localization = localization;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.element = element;
        this.domEvents = domEvents;
        this.selectionService = selectionService;
        this.cellSelectionService = cellSelectionService;
        this.columnInfoService = columnInfoService;
        this.navigationService = navigationService;
        this.columns = [];
        this.groups = [];
        this.skip = 0;
        this.noRecordsText = this.localization.get('noRecords');
        this.isLocked = false;
        this.skipGroupDecoration = false;
        this.showGroupFooters = false;
        this.lockedColumnsCount = 0;
        this.totalColumnsCount = 0;
        this.trackBy = defaultTrackBy;
        this.rowClass = function () { return null; };
        this.cellKeydownSubscription = this.navigationService.cellKeydown.subscribe(function (args) { return _this.cellKeydownHandler(args); });
        this.trackByWrapper = this.trackByWrapper.bind(this);
        this.trackByColumns = this.trackByColumns.bind(this);
    }
    Object.defineProperty(TableBodyComponent.prototype, "newDataItem", {
        get: function () {
            return this.editService.newDataItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "unlockedColumnsCount", {
        // Number of unlocked columns in the next table, if any
        get: function () {
            return this.totalColumnsCount - this.lockedColumnsCount - (this.allColumns || this.columns).length;
        },
        enumerable: true,
        configurable: true
    });
    TableBodyComponent.prototype.isAriaSelected = function (item, column) {
        return this.cellSelectionService.isCellSelected(item, column) ||
            this.isRowSelected(item) ? 'true' : 'false';
    };
    TableBodyComponent.prototype.toggleRow = function (index, dataItem) {
        this.detailsService.toggleRow(index, dataItem);
        return false;
    };
    TableBodyComponent.prototype.isExpanded = function (viewItem) {
        return this.detailsService.isExpanded(viewItem.index, viewItem.data);
    };
    TableBodyComponent.prototype.detailButtonStyles = function (viewItem) {
        var expanded = this.isExpanded(viewItem);
        return expanded ? 'k-minus' : 'k-plus';
    };
    TableBodyComponent.prototype.detailButtonTitle = function (viewItem) {
        var messageKey = this.isExpanded(viewItem) ? 'detailCollapse' : 'detailExpand';
        return this.localization.get(messageKey);
    };
    TableBodyComponent.prototype.isGroup = function (item) {
        return item.type === 'group';
    };
    TableBodyComponent.prototype.isDataItem = function (item) {
        return !this.isGroup(item) && !this.isFooter(item);
    };
    TableBodyComponent.prototype.isFooter = function (item) {
        return item.type === 'footer';
    };
    TableBodyComponent.prototype.isInExpandedGroup = function (item) {
        return this.groupsService.isInExpandedGroup(item.groupIndex, false);
    };
    TableBodyComponent.prototype.isParentGroupExpanded = function (item) {
        return this.groupsService.isInExpandedGroup(item.index || item.groupIndex);
    };
    TableBodyComponent.prototype.isOdd = function (item) {
        return item.index % 2 !== 0;
    };
    TableBodyComponent.prototype.isSelectable = function () {
        return this.selectable && this.selectable.enabled !== false;
    };
    TableBodyComponent.prototype.isRowSelected = function (item) {
        return this.selectionService.isSelected(item.index);
    };
    TableBodyComponent.prototype.trackByWrapper = function (index, item) {
        if (item.type === 'data') {
            item.isEditing = this.editService.hasEdited(item.index);
        }
        return this.trackBy(index, item);
    };
    TableBodyComponent.prototype.trackByColumns = function (index, item) {
        return this.virtualColumns ? index : item;
    };
    TableBodyComponent.prototype.ngDoCheck = function () {
        if (this.hasGroupHeaderColumn) {
            this.groupHeaderColumns = columnsToRender(this.skipGroupDecoration ? this.columns : this.columns.toArray().slice(1));
        }
        else {
            this.groupHeaderColumns = [];
        }
        if (this.isLocked) {
            this.groupHeaderSlaveCellsCount =
                this.hasGroupHeaderColumn ? this.columnsContainer.nonLockedColumnsToRender.length : 1;
        }
        else {
            this.groupHeaderSlaveCellsCount = 0;
        }
    };
    TableBodyComponent.prototype.ngOnChanges = function (changes) {
        if (isChanged("columns", changes, false)) {
            this.changeNotification.notify();
        }
    };
    TableBodyComponent.prototype.logicalRowIndex = function (rowIndex) {
        var pos = this.skip + rowIndex;
        if (this.hasDetailTemplate) {
            pos *= 2;
        }
        var absoluteRowIndex = 1 + pos;
        var addRowOffset = this.editService.hasNewItem ? 1 : 0;
        var filterRowOffset = hasFilterRow(this.filterable) ? 1 : 0;
        var headerRowCount = this.columnInfoService.totalLevels + filterRowOffset + addRowOffset;
        return absoluteRowIndex + headerRowCount;
    };
    TableBodyComponent.prototype.addRowLogicalIndex = function () {
        return this.columnInfoService.totalLevels + 1 +
            (hasFilterRow(this.filterable) ? 1 : 0);
    };
    TableBodyComponent.prototype.logicalColIndex = function (column) {
        if (!isPresent(column.leafIndex)) {
            return -1;
        }
        return column.leafIndex + (this.hasDetailTemplate ? 1 : 0);
    };
    TableBodyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var clickHandler = _this.clickHandler.bind(_this);
            var mousedownSubscription = _this.renderer.listen(_this.element.nativeElement, 'mousedown', clickHandler);
            var mouseupSubscription = _this.renderer.listen(_this.element.nativeElement, 'mouseup', clickHandler);
            var clickSubscription = _this.renderer.listen(_this.element.nativeElement, 'click', clickHandler);
            var contextmenuSubscription = _this.renderer.listen(_this.element.nativeElement, 'contextmenu', clickHandler);
            var touchstartSubscription = _this.renderer.listen(_this.element.nativeElement, 'touchstart', clickHandler);
            var touchendSubscription = _this.renderer.listen(_this.element.nativeElement, 'touchend', clickHandler);
            _this.clickSubscription = function () {
                mousedownSubscription();
                mouseupSubscription();
                clickSubscription();
                contextmenuSubscription();
            };
            _this.touchSubscription = function () {
                touchstartSubscription();
                touchendSubscription();
            };
        });
        var originalNoRecordText = this.localization.get('noRecords');
        this.localization.changes.subscribe(function () {
            if (_this.noRecordsText === originalNoRecordText) {
                _this.noRecordsText = _this.localization.get('noRecords');
                originalNoRecordText = _this.noRecordsText;
            }
        });
    };
    TableBodyComponent.prototype.ngOnDestroy = function () {
        if (this.clickSubscription) {
            this.clickSubscription();
        }
        if (this.touchSubscription) {
            this.touchSubscription();
        }
        this.cellKeydownSubscription.unsubscribe();
        clearTimeout(this.clickTimeout);
    };
    TableBodyComponent.prototype.isEditingCell = function (index, column) {
        return this.editService.isEditing() && this.editService.isEditedColumn(index, column);
    };
    TableBodyComponent.prototype.isEditingRow = function (index) {
        return this.editService.isEditing() && this.editService.hasEdited(index);
    };
    Object.defineProperty(TableBodyComponent.prototype, "hasGroupHeaderColumn", {
        get: function () {
            return this.columnsContainer.hasGroupHeaderColumn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "columnsContainer", {
        get: function () {
            return this.columnInfoService.columnsContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "columnsSpan", {
        get: function () {
            return columnsSpan(this.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "allColumnsSpan", {
        get: function () {
            return columnsSpan(this.allColumns || this.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "colSpan", {
        get: function () {
            return this.columnsSpan + this.groups.length + (this.hasDetailTemplate ? 1 : 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "footerColumns", {
        get: function () {
            return this.isLocked ? this.columnsContainer.lockedColumnsToRender : this.columnsContainer.nonLockedColumnsToRender;
        },
        enumerable: true,
        configurable: true
    });
    TableBodyComponent.prototype.showGroupHeader = function (item) {
        return !item.data.skipHeader;
    };
    Object.defineProperty(TableBodyComponent.prototype, "hasDetailTemplate", {
        get: function () {
            return isPresent(this.detailTemplate);
        },
        enumerable: true,
        configurable: true
    });
    TableBodyComponent.prototype.clickHandler = function (eventArg) {
        var _this = this;
        var element = this.element.nativeElement;
        var target = this.eventTarget(eventArg);
        var cell, row, body, gridElement;
        var currentTarget = target;
        do {
            cell = closest(currentTarget, matchesNodeName('td'));
            row = closest(cell, matchesNodeName('tr'));
            body = closest(row, matchesNodeName('tbody'));
            currentTarget = body;
            gridElement = closestInScope(currentTarget, matchesClasses('k-grid'), element);
        } while (body && body !== element && !gridElement);
        if (cell && !hasClasses(cell, NON_DATA_CELL_CLASSES) &&
            !hasClasses(row, NON_DATA_ROW_CLASSES) &&
            body === element && !gridElement) {
            this.editService.preventCellClose();
            var focusable = target !== cell && isFocusableWithTabKey(target, false);
            if (!focusable && !matchesNodeName('label')(target) && !hasClasses(target, IGNORE_TARGET_CLASSSES) &&
                !closestInScope(target, matchesClasses(IGNORE_CONTAINER_CLASSES), cell)) {
                var args_1 = this.cellClickArgs(cell, row, eventArg);
                if (eventArg.type === 'mousedown' || eventArg.type === 'touchstart') {
                    this.domEvents.cellMousedown.emit(args_1);
                }
                else if (eventArg.type === 'mouseup' || eventArg.type === 'touchend') {
                    this.domEvents.cellMouseup.emit(args_1);
                }
                else {
                    if (args_1.isEditedColumn || !this.editService.closeCell(eventArg)) {
                        if (eventArg.type === 'click') {
                            this.clickTimeout = setTimeout(function () {
                                _this.emitCellClick(args_1);
                            }, 0);
                        }
                        else {
                            this.emitCellClick(args_1);
                        }
                    }
                }
            }
        }
    };
    TableBodyComponent.prototype.emitCellClick = function (args) {
        this.domEvents.cellClick.emit(Object.assign(args, {
            isEdited: args.isEditedRow || args.isEditedColumn
        }));
    };
    TableBodyComponent.prototype.cellKeydownHandler = function (args) {
        if (args.keyCode === Keys.Enter) {
            this.clickHandler(args);
        }
    };
    TableBodyComponent.prototype.cellClickArgs = function (cell, row, eventArg) {
        var index = columnCellIndex(cell, row.cells);
        var column = this.columns.toArray()[index];
        var columnIndex = this.lockedColumnsCount + index;
        var rowIndex = row.getAttribute('data-kendo-grid-item-index');
        rowIndex = rowIndex ? parseInt(rowIndex, 10) : -1;
        var dataItem = rowIndex === -1 ? this.editService.newDataItem : this.data.at(rowIndex - this.skip);
        var isEditedColumn = this.editService.isEditedColumn(rowIndex, column);
        var isEditedRow = this.editService.isEdited(rowIndex);
        var type = eventArg.type === 'keydown' ? 'click' : eventArg.type;
        return {
            column: column,
            columnIndex: columnIndex,
            dataItem: dataItem,
            isEditedColumn: isEditedColumn,
            isEditedRow: isEditedRow,
            originalEvent: eventArg,
            rowIndex: rowIndex,
            type: type
        };
    };
    TableBodyComponent.prototype.eventTarget = function (args) {
        if (args.type === 'touchend') {
            var touch = args.changedTouches[0];
            return document.elementFromPoint(touch.clientX, touch.clientY);
        }
        return args.target;
    };
    TableBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoGridTableBody]',
                    template: "\n    <ng-template [ngIf]=\"editService.hasNewItem\">\n        <tr class=\"k-grid-add-row k-grid-edit-row\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"addRowLogicalIndex()\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\">\n            <ng-template [ngIf]=\"!skipGroupDecoration\">\n                <td class=\"k-group-cell\" *ngFor=\"let g of groups\" role=\"presentation\"></td>\n            </ng-template>\n            <td class=\"k-hierarchy-cell\"\n                *ngIf=\"detailTemplate?.templateRef\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"addRowLogicalIndex()\"\n                    [logicalColIndex]=\"0\"\n                    aria-selected=\"false\"\n                >\n            </td>\n            <td *ngFor=\"let column of columns; let columnIndex = index; trackBy: trackByColumns;\"\n                kendoGridCell\n                    [rowIndex]=\"-1\"\n                    [columnIndex]=\"lockedColumnsCount + columnIndex\"\n                    [isNew]=\"true\"\n                    [column]=\"column\"\n                    [dataItem]=\"newDataItem\"\n                [ngClass]=\"column.cssClass\"\n                [ngStyle]=\"column.style\"\n                [attr.colspan]=\"column.colspan\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"addRowLogicalIndex()\"\n                    [logicalColIndex]=\"logicalColIndex(column)\"\n                    [colSpan]=\"column.colspan\"\n                role=\"gridcell\">\n            </td>\n        </tr>\n    </ng-template>\n    <tr *ngIf=\"data?.length === 0 || data == null\" class=\"k-grid-norecords\">\n        <td [attr.colspan]=\"colSpan\">\n            <ng-template\n                [ngIf]=\"noRecordsTemplate?.templateRef\"\n                [templateContext]=\"{\n                    templateRef: noRecordsTemplate?.templateRef\n                 }\">\n            </ng-template>\n            <ng-container *ngIf=\"!noRecordsTemplate?.templateRef\">\n                {{noRecordsText}}\n            </ng-container>\n        </td>\n    </tr>\n    <ng-template ngFor\n        [ngForOf]=\"data\"\n        [ngForTrackBy]=\"trackByWrapper\"\n        let-item\n        let-rowIndex=\"index\">\n        <tr *ngIf=\"isGroup(item) && isParentGroupExpanded(item) && showGroupHeader(item)\"\n            kendoGridGroupHeader\n                [columns]=\"columns\"\n                [groups]=\"groups\"\n                [item]=\"item\"\n                [hasDetails]=\"detailTemplate?.templateRef\"\n                [skipGroupDecoration]=\"skipGroupDecoration\"\n                [hasGroupHeaderColumn]=\"hasGroupHeaderColumn\"\n                [groupHeaderColumns]=\"groupHeaderColumns\"\n                [rowIndex]=\"rowIndex + 1\"\n                [totalColumnsCount]=\"totalColumnsCount\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"groupHeaderSlaveCellsCount\">\n        </tr>\n        <tr\n            *ngIf=\"isDataItem(item) && isInExpandedGroup(item)\"\n            kendoGridLogicalRow\n                [dataRowIndex]=\"item.index\"\n                [dataItem]=\"item.data\"\n                [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\"\n            [ngClass]=\"rowClass({ dataItem: item.data, index: item.index })\"\n            [class.k-alt]=\"isOdd(item)\"\n            [class.k-master-row]=\"detailTemplate?.templateRef\"\n            [class.k-grid-edit-row]=\"isEditingRow(item.index)\"\n            [attr.data-kendo-grid-item-index]=\"item.index\"\n            [class.k-state-selected]=\"isSelectable() && isRowSelected(item)\">\n            <ng-template [ngIf]=\"!skipGroupDecoration\">\n                <td class=\"k-group-cell\" *ngFor=\"let g of groups\" role=\"presentation\"></td>\n            </ng-template>\n            <td class=\"k-hierarchy-cell\"\n                *ngIf=\"detailTemplate?.templateRef\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                    [logicalColIndex]=\"0\"\n                    [dataRowIndex]=\"item.index\"\n                    [dataItem]=\"item.data\"\n                    [detailExpandCell]=\"true\"\n                    aria-selected=\"false\"\n                >\n                <a class=\"k-icon\"\n                    *ngIf=\"detailTemplate.showIf(item.data, item.index)\"\n                    [ngClass]=\"detailButtonStyles(item)\"\n                    [attr.title]=\"detailButtonTitle(item)\"\n                    href=\"#\" tabindex=\"-1\" (click)=\"toggleRow(item.index, item.data)\"></a>\n            </td>\n            <td\n                kendoGridCell\n                    [rowIndex]=\"item.index\"\n                    [columnIndex]=\"lockedColumnsCount + columnIndex\"\n                    [attr.data-kendo-grid-column-index]=\"lockedColumnsCount + columnIndex\"\n                    [column]=\"column\"\n                    [dataItem]=\"item.data\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                    [logicalColIndex]=\"logicalColIndex(column)\"\n                    [dataRowIndex]=\"item.index\"\n                    [dataItem]=\"item.data\"\n                    [colIndex]=\"columnIndex\"\n                    [colSpan]=\"column.colspan\"\n                    role=\"gridcell\"\n                    [attr.aria-selected]=\"isSelectable() ? isAriaSelected(item, column) : undefined\"\n                    [style.touch-action]=\"isSelectable() && $any(selectable).drag ? 'none' : 'auto'\"\n                [ngClass]=\"column.cssClass\"\n                [class.k-grid-edit-cell]=\"isEditingCell(item.index, column)\"\n                [ngStyle]=\"column.style\"\n                [attr.colspan]=\"column.colspan\"\n                [class.k-state-selected]=\"isSelectable && cellSelectionService.isCellSelected(item, column)\"\n                *ngFor=\"let column of columns; let columnIndex = index; trackBy: trackByColumns;\">\n            </td>\n        </tr>\n        <tr *ngIf=\"isDataItem(item) && isInExpandedGroup(item) && detailTemplate?.templateRef &&\n            detailTemplate.showIf(item.data, item.index) && isExpanded(item)\"\n            class=\"k-detail-row\"\n            [class.k-alt]=\"isOdd(item)\"\n            kendoGridLogicalRow\n                [dataRowIndex]=\"item.index\"\n                [dataItem]=\"item.data\"\n                [logicalRowIndex]=\"logicalRowIndex(rowIndex) + 1\"\n                [logicalSlaveRow]=\"false\"\n                [logicalCellsCount]=\"1\"\n            >\n            <td class=\"k-group-cell\" *ngFor=\"let g of groups\"></td>\n            <td class=\"k-hierarchy-cell\"></td>\n            <td class=\"k-detail-cell\"\n                [attr.colspan]=\"columnsSpan\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex) + 1\"\n                    [logicalColIndex]=\"0\"\n                    [dataRowIndex]=\"item.index\"\n                    [dataItem]=\"item.data\"\n                    [colIndex]=\"0\"\n                    [colSpan]=\"allColumnsSpan + 1\"\n                    role=\"gridcell\" aria-selected=\"false\"\n                >\n                <ng-template\n                    [ngTemplateOutlet]=\"detailTemplate.templateRef\"\n                    [ngTemplateOutletContext]=\"{\n                        dataItem: item.data,\n                        rowIndex: item.index,\n                        $implicit: item.data\n                    }\">\n                </ng-template>\n            </td>\n        </tr>\n        <tr *ngIf=\"isFooter(item) && (isInExpandedGroup(item) || (showGroupFooters && isParentGroupExpanded(item)))\n            && !item.data.hideFooter\"\n            class=\"k-group-footer\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\">\n            <ng-template [ngIf]=\"!skipGroupDecoration\">\n                <td class=\"k-group-cell\" *ngFor=\"let g of groups\"></td>\n            </ng-template>\n            <td class=\"k-hierarchy-cell\"\n                *ngIf=\"detailTemplate?.templateRef\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                    [logicalColIndex]=\"0\"\n                    aria-selected=\"false\"\n                >\n            </td>\n            <td kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                    [logicalColIndex]=\"logicalColIndex(column)\"\n                [attr.data-skip]=\"skipGroupDecoration\"\n                *ngFor=\"let column of footerColumns; let columnIndex = index; trackBy: trackByColumns;\">\n                <ng-template\n                    [templateContext]=\"{\n                        templateRef: column.groupFooterTemplateRef,\n                        group: item.data,\n                        field: column.field,\n                        column: column,\n                        aggregates: item.data?.aggregates,\n                        $implicit: item.data?.aggregates\n                    }\">\n                </ng-template>\n           </td>\n        </tr>\n    </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    TableBodyComponent.ctorParameters = function () { return [
        { type: DetailsService },
        { type: GroupsService },
        { type: ChangeNotificationService },
        { type: EditService },
        { type: LocalizationService },
        { type: NgZone },
        { type: Renderer2 },
        { type: ElementRef },
        { type: DomEventsService },
        { type: SelectionService },
        { type: CellSelectionService },
        { type: ColumnInfoService },
        { type: NavigationService }
    ]; };
    TableBodyComponent.propDecorators = {
        columns: [{ type: Input }],
        allColumns: [{ type: Input }],
        groups: [{ type: Input }],
        detailTemplate: [{ type: Input }],
        noRecordsTemplate: [{ type: Input }],
        data: [{ type: Input }],
        skip: [{ type: Input }],
        selectable: [{ type: Input }],
        filterable: [{ type: Input }],
        noRecordsText: [{ type: Input }],
        isLocked: [{ type: Input }],
        skipGroupDecoration: [{ type: Input }],
        showGroupFooters: [{ type: Input }],
        lockedColumnsCount: [{ type: Input }],
        totalColumnsCount: [{ type: Input }],
        virtualColumns: [{ type: Input }],
        trackBy: [{ type: Input }],
        rowClass: [{ type: Input }]
    };
    return TableBodyComponent;
}());
export { TableBodyComponent };
export { ɵ0 };
