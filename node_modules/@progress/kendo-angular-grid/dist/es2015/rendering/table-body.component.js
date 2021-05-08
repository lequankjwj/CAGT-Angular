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
const columnCellIndex = (cell, cells) => {
    let cellIndex = 0;
    for (let idx = 0; idx < cells.length; idx++) {
        if (cells[idx] === cell) {
            return cellIndex;
        }
        if (!hasClasses(cells[idx], 'k-hierarchy-cell k-group-cell')) {
            cellIndex++;
        }
    }
};
const ɵ0 = columnCellIndex;
/**
 * @hidden
 */
export class TableBodyComponent {
    constructor(detailsService, groupsService, changeNotification, editService, localization, ngZone, renderer, element, domEvents, selectionService, cellSelectionService, columnInfoService, navigationService) {
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
        this.rowClass = () => null;
        this.cellKeydownSubscription = this.navigationService.cellKeydown.subscribe((args) => this.cellKeydownHandler(args));
        this.trackByWrapper = this.trackByWrapper.bind(this);
        this.trackByColumns = this.trackByColumns.bind(this);
    }
    get newDataItem() {
        return this.editService.newDataItem;
    }
    // Number of unlocked columns in the next table, if any
    get unlockedColumnsCount() {
        return this.totalColumnsCount - this.lockedColumnsCount - (this.allColumns || this.columns).length;
    }
    isAriaSelected(item, column) {
        return this.cellSelectionService.isCellSelected(item, column) ||
            this.isRowSelected(item) ? 'true' : 'false';
    }
    toggleRow(index, dataItem) {
        this.detailsService.toggleRow(index, dataItem);
        return false;
    }
    isExpanded(viewItem) {
        return this.detailsService.isExpanded(viewItem.index, viewItem.data);
    }
    detailButtonStyles(viewItem) {
        const expanded = this.isExpanded(viewItem);
        return expanded ? 'k-minus' : 'k-plus';
    }
    detailButtonTitle(viewItem) {
        const messageKey = this.isExpanded(viewItem) ? 'detailCollapse' : 'detailExpand';
        return this.localization.get(messageKey);
    }
    isGroup(item) {
        return item.type === 'group';
    }
    isDataItem(item) {
        return !this.isGroup(item) && !this.isFooter(item);
    }
    isFooter(item) {
        return item.type === 'footer';
    }
    isInExpandedGroup(item) {
        return this.groupsService.isInExpandedGroup(item.groupIndex, false);
    }
    isParentGroupExpanded(item) {
        return this.groupsService.isInExpandedGroup(item.index || item.groupIndex);
    }
    isOdd(item) {
        return item.index % 2 !== 0;
    }
    isSelectable() {
        return this.selectable && this.selectable.enabled !== false;
    }
    isRowSelected(item) {
        return this.selectionService.isSelected(item.index);
    }
    trackByWrapper(index, item) {
        if (item.type === 'data') {
            item.isEditing = this.editService.hasEdited(item.index);
        }
        return this.trackBy(index, item);
    }
    trackByColumns(index, item) {
        return this.virtualColumns ? index : item;
    }
    ngDoCheck() {
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
    }
    ngOnChanges(changes) {
        if (isChanged("columns", changes, false)) {
            this.changeNotification.notify();
        }
    }
    logicalRowIndex(rowIndex) {
        let pos = this.skip + rowIndex;
        if (this.hasDetailTemplate) {
            pos *= 2;
        }
        const absoluteRowIndex = 1 + pos;
        const addRowOffset = this.editService.hasNewItem ? 1 : 0;
        const filterRowOffset = hasFilterRow(this.filterable) ? 1 : 0;
        const headerRowCount = this.columnInfoService.totalLevels + filterRowOffset + addRowOffset;
        return absoluteRowIndex + headerRowCount;
    }
    addRowLogicalIndex() {
        return this.columnInfoService.totalLevels + 1 +
            (hasFilterRow(this.filterable) ? 1 : 0);
    }
    logicalColIndex(column) {
        if (!isPresent(column.leafIndex)) {
            return -1;
        }
        return column.leafIndex + (this.hasDetailTemplate ? 1 : 0);
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            const clickHandler = this.clickHandler.bind(this);
            const mousedownSubscription = this.renderer.listen(this.element.nativeElement, 'mousedown', clickHandler);
            const mouseupSubscription = this.renderer.listen(this.element.nativeElement, 'mouseup', clickHandler);
            const clickSubscription = this.renderer.listen(this.element.nativeElement, 'click', clickHandler);
            const contextmenuSubscription = this.renderer.listen(this.element.nativeElement, 'contextmenu', clickHandler);
            const touchstartSubscription = this.renderer.listen(this.element.nativeElement, 'touchstart', clickHandler);
            const touchendSubscription = this.renderer.listen(this.element.nativeElement, 'touchend', clickHandler);
            this.clickSubscription = () => {
                mousedownSubscription();
                mouseupSubscription();
                clickSubscription();
                contextmenuSubscription();
            };
            this.touchSubscription = () => {
                touchstartSubscription();
                touchendSubscription();
            };
        });
        let originalNoRecordText = this.localization.get('noRecords');
        this.localization.changes.subscribe(() => {
            if (this.noRecordsText === originalNoRecordText) {
                this.noRecordsText = this.localization.get('noRecords');
                originalNoRecordText = this.noRecordsText;
            }
        });
    }
    ngOnDestroy() {
        if (this.clickSubscription) {
            this.clickSubscription();
        }
        if (this.touchSubscription) {
            this.touchSubscription();
        }
        this.cellKeydownSubscription.unsubscribe();
        clearTimeout(this.clickTimeout);
    }
    isEditingCell(index, column) {
        return this.editService.isEditing() && this.editService.isEditedColumn(index, column);
    }
    isEditingRow(index) {
        return this.editService.isEditing() && this.editService.hasEdited(index);
    }
    get hasGroupHeaderColumn() {
        return this.columnsContainer.hasGroupHeaderColumn;
    }
    get columnsContainer() {
        return this.columnInfoService.columnsContainer;
    }
    get columnsSpan() {
        return columnsSpan(this.columns);
    }
    get allColumnsSpan() {
        return columnsSpan(this.allColumns || this.columns);
    }
    get colSpan() {
        return this.columnsSpan + this.groups.length + (this.hasDetailTemplate ? 1 : 0);
    }
    get footerColumns() {
        return this.isLocked ? this.columnsContainer.lockedColumnsToRender : this.columnsContainer.nonLockedColumnsToRender;
    }
    showGroupHeader(item) {
        return !item.data.skipHeader;
    }
    get hasDetailTemplate() {
        return isPresent(this.detailTemplate);
    }
    clickHandler(eventArg) {
        const element = this.element.nativeElement;
        const target = this.eventTarget(eventArg);
        let cell, row, body, gridElement;
        let currentTarget = target;
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
            const focusable = target !== cell && isFocusableWithTabKey(target, false);
            if (!focusable && !matchesNodeName('label')(target) && !hasClasses(target, IGNORE_TARGET_CLASSSES) &&
                !closestInScope(target, matchesClasses(IGNORE_CONTAINER_CLASSES), cell)) {
                const args = this.cellClickArgs(cell, row, eventArg);
                if (eventArg.type === 'mousedown' || eventArg.type === 'touchstart') {
                    this.domEvents.cellMousedown.emit(args);
                }
                else if (eventArg.type === 'mouseup' || eventArg.type === 'touchend') {
                    this.domEvents.cellMouseup.emit(args);
                }
                else {
                    if (args.isEditedColumn || !this.editService.closeCell(eventArg)) {
                        if (eventArg.type === 'click') {
                            this.clickTimeout = setTimeout(() => {
                                this.emitCellClick(args);
                            }, 0);
                        }
                        else {
                            this.emitCellClick(args);
                        }
                    }
                }
            }
        }
    }
    emitCellClick(args) {
        this.domEvents.cellClick.emit(Object.assign(args, {
            isEdited: args.isEditedRow || args.isEditedColumn
        }));
    }
    cellKeydownHandler(args) {
        if (args.keyCode === Keys.Enter) {
            this.clickHandler(args);
        }
    }
    cellClickArgs(cell, row, eventArg) {
        const index = columnCellIndex(cell, row.cells);
        const column = this.columns.toArray()[index];
        const columnIndex = this.lockedColumnsCount + index;
        let rowIndex = row.getAttribute('data-kendo-grid-item-index');
        rowIndex = rowIndex ? parseInt(rowIndex, 10) : -1;
        const dataItem = rowIndex === -1 ? this.editService.newDataItem : this.data.at(rowIndex - this.skip);
        const isEditedColumn = this.editService.isEditedColumn(rowIndex, column);
        const isEditedRow = this.editService.isEdited(rowIndex);
        const type = eventArg.type === 'keydown' ? 'click' : eventArg.type;
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
    }
    eventTarget(args) {
        if (args.type === 'touchend') {
            const touch = args.changedTouches[0];
            return document.elementFromPoint(touch.clientX, touch.clientY);
        }
        return args.target;
    }
}
TableBodyComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridTableBody]',
                template: `
    <ng-template [ngIf]="editService.hasNewItem">
        <tr class="k-grid-add-row k-grid-edit-row"
            kendoGridLogicalRow
                [logicalRowIndex]="addRowLogicalIndex()"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount">
            <ng-template [ngIf]="!skipGroupDecoration">
                <td class="k-group-cell" *ngFor="let g of groups" role="presentation"></td>
            </ng-template>
            <td class="k-hierarchy-cell"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="addRowLogicalIndex()"
                    [logicalColIndex]="0"
                    aria-selected="false"
                >
            </td>
            <td *ngFor="let column of columns; let columnIndex = index; trackBy: trackByColumns;"
                kendoGridCell
                    [rowIndex]="-1"
                    [columnIndex]="lockedColumnsCount + columnIndex"
                    [isNew]="true"
                    [column]="column"
                    [dataItem]="newDataItem"
                [ngClass]="column.cssClass"
                [ngStyle]="column.style"
                [attr.colspan]="column.colspan"
                kendoGridLogicalCell
                    [logicalRowIndex]="addRowLogicalIndex()"
                    [logicalColIndex]="logicalColIndex(column)"
                    [colSpan]="column.colspan"
                role="gridcell">
            </td>
        </tr>
    </ng-template>
    <tr *ngIf="data?.length === 0 || data == null" class="k-grid-norecords">
        <td [attr.colspan]="colSpan">
            <ng-template
                [ngIf]="noRecordsTemplate?.templateRef"
                [templateContext]="{
                    templateRef: noRecordsTemplate?.templateRef
                 }">
            </ng-template>
            <ng-container *ngIf="!noRecordsTemplate?.templateRef">
                {{noRecordsText}}
            </ng-container>
        </td>
    </tr>
    <ng-template ngFor
        [ngForOf]="data"
        [ngForTrackBy]="trackByWrapper"
        let-item
        let-rowIndex="index">
        <tr *ngIf="isGroup(item) && isParentGroupExpanded(item) && showGroupHeader(item)"
            kendoGridGroupHeader
                [columns]="columns"
                [groups]="groups"
                [item]="item"
                [hasDetails]="detailTemplate?.templateRef"
                [skipGroupDecoration]="skipGroupDecoration"
                [hasGroupHeaderColumn]="hasGroupHeaderColumn"
                [groupHeaderColumns]="groupHeaderColumns"
                [rowIndex]="rowIndex + 1"
                [totalColumnsCount]="totalColumnsCount"
            kendoGridLogicalRow
                [logicalRowIndex]="logicalRowIndex(rowIndex)"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="groupHeaderSlaveCellsCount">
        </tr>
        <tr
            *ngIf="isDataItem(item) && isInExpandedGroup(item)"
            kendoGridLogicalRow
                [dataRowIndex]="item.index"
                [dataItem]="item.data"
                [logicalRowIndex]="logicalRowIndex(rowIndex)"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount"
            [ngClass]="rowClass({ dataItem: item.data, index: item.index })"
            [class.k-alt]="isOdd(item)"
            [class.k-master-row]="detailTemplate?.templateRef"
            [class.k-grid-edit-row]="isEditingRow(item.index)"
            [attr.data-kendo-grid-item-index]="item.index"
            [class.k-state-selected]="isSelectable() && isRowSelected(item)">
            <ng-template [ngIf]="!skipGroupDecoration">
                <td class="k-group-cell" *ngFor="let g of groups" role="presentation"></td>
            </ng-template>
            <td class="k-hierarchy-cell"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="0"
                    [dataRowIndex]="item.index"
                    [dataItem]="item.data"
                    [detailExpandCell]="true"
                    aria-selected="false"
                >
                <a class="k-icon"
                    *ngIf="detailTemplate.showIf(item.data, item.index)"
                    [ngClass]="detailButtonStyles(item)"
                    [attr.title]="detailButtonTitle(item)"
                    href="#" tabindex="-1" (click)="toggleRow(item.index, item.data)"></a>
            </td>
            <td
                kendoGridCell
                    [rowIndex]="item.index"
                    [columnIndex]="lockedColumnsCount + columnIndex"
                    [attr.data-kendo-grid-column-index]="lockedColumnsCount + columnIndex"
                    [column]="column"
                    [dataItem]="item.data"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="logicalColIndex(column)"
                    [dataRowIndex]="item.index"
                    [dataItem]="item.data"
                    [colIndex]="columnIndex"
                    [colSpan]="column.colspan"
                    role="gridcell"
                    [attr.aria-selected]="isSelectable() ? isAriaSelected(item, column) : undefined"
                    [style.touch-action]="isSelectable() && $any(selectable).drag ? 'none' : 'auto'"
                [ngClass]="column.cssClass"
                [class.k-grid-edit-cell]="isEditingCell(item.index, column)"
                [ngStyle]="column.style"
                [attr.colspan]="column.colspan"
                [class.k-state-selected]="isSelectable && cellSelectionService.isCellSelected(item, column)"
                *ngFor="let column of columns; let columnIndex = index; trackBy: trackByColumns;">
            </td>
        </tr>
        <tr *ngIf="isDataItem(item) && isInExpandedGroup(item) && detailTemplate?.templateRef &&
            detailTemplate.showIf(item.data, item.index) && isExpanded(item)"
            class="k-detail-row"
            [class.k-alt]="isOdd(item)"
            kendoGridLogicalRow
                [dataRowIndex]="item.index"
                [dataItem]="item.data"
                [logicalRowIndex]="logicalRowIndex(rowIndex) + 1"
                [logicalSlaveRow]="false"
                [logicalCellsCount]="1"
            >
            <td class="k-group-cell" *ngFor="let g of groups"></td>
            <td class="k-hierarchy-cell"></td>
            <td class="k-detail-cell"
                [attr.colspan]="columnsSpan"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex) + 1"
                    [logicalColIndex]="0"
                    [dataRowIndex]="item.index"
                    [dataItem]="item.data"
                    [colIndex]="0"
                    [colSpan]="allColumnsSpan + 1"
                    role="gridcell" aria-selected="false"
                >
                <ng-template
                    [ngTemplateOutlet]="detailTemplate.templateRef"
                    [ngTemplateOutletContext]="{
                        dataItem: item.data,
                        rowIndex: item.index,
                        $implicit: item.data
                    }">
                </ng-template>
            </td>
        </tr>
        <tr *ngIf="isFooter(item) && (isInExpandedGroup(item) || (showGroupFooters && isParentGroupExpanded(item)))
            && !item.data.hideFooter"
            class="k-group-footer"
            kendoGridLogicalRow
                [logicalRowIndex]="logicalRowIndex(rowIndex)"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount">
            <ng-template [ngIf]="!skipGroupDecoration">
                <td class="k-group-cell" *ngFor="let g of groups"></td>
            </ng-template>
            <td class="k-hierarchy-cell"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="0"
                    aria-selected="false"
                >
            </td>
            <td kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="logicalColIndex(column)"
                [attr.data-skip]="skipGroupDecoration"
                *ngFor="let column of footerColumns; let columnIndex = index; trackBy: trackByColumns;">
                <ng-template
                    [templateContext]="{
                        templateRef: column.groupFooterTemplateRef,
                        group: item.data,
                        field: column.field,
                        column: column,
                        aggregates: item.data?.aggregates,
                        $implicit: item.data?.aggregates
                    }">
                </ng-template>
           </td>
        </tr>
    </ng-template>
    `
            },] },
];
/** @nocollapse */
TableBodyComponent.ctorParameters = () => [
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
];
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
export { ɵ0 };
