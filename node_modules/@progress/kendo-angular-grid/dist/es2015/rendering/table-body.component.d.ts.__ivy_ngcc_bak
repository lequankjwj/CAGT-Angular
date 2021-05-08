/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { SimpleChange, NgZone, Renderer2, ElementRef, OnInit, OnDestroy, OnChanges, DoCheck, TrackByFunction } from '@angular/core';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { ColumnBase } from '../columns/column-base';
import { DetailTemplateDirective } from './details/detail-template.directive';
import { GroupsService } from '../grouping/groups.service';
import { ChangeNotificationService } from '../data/change-notification.service';
import { NoRecordsTemplateDirective } from './no-records-template.directive';
import { EditService } from '../editing/edit.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { RowClassFn } from './common/row-class';
import { SelectableSettings } from '../selection/types';
import { DomEventsService } from '../common/dom-events.service';
import { SelectionService } from "../selection/selection.service";
import { ColumnInfoService } from "../common/column-info.service";
import { FilterableSettings } from '../filtering/filterable';
import { NavigationService } from '../navigation/navigation.service';
import { GridItem } from '../data/grid-item.interface';
import { DataItem } from '../data/data-item.interface';
import { DetailsService } from './details/details.service';
import { CellSelectionService } from '../selection/cell-selection.service';
/**
 * @hidden
 */
export declare class TableBodyComponent implements OnInit, OnDestroy, OnChanges, DoCheck {
    detailsService: DetailsService;
    groupsService: GroupsService;
    private changeNotification;
    editService: EditService;
    private localization;
    private ngZone;
    private renderer;
    private element;
    private domEvents;
    selectionService: SelectionService;
    cellSelectionService: CellSelectionService;
    private columnInfoService;
    private navigationService;
    columns: Array<ColumnBase>;
    allColumns: Array<ColumnBase>;
    groups: Array<GroupDescriptor>;
    detailTemplate: DetailTemplateDirective;
    noRecordsTemplate: NoRecordsTemplateDirective;
    data: Array<GridItem>;
    skip: number;
    selectable: SelectableSettings | boolean;
    filterable: FilterableSettings;
    noRecordsText: string;
    isLocked: boolean;
    skipGroupDecoration: boolean;
    showGroupFooters: boolean;
    lockedColumnsCount: number;
    totalColumnsCount: number;
    virtualColumns: boolean;
    trackBy: TrackByFunction<GridItem>;
    groupHeaderSlaveCellsCount: number;
    groupHeaderColumns: any[];
    private clickSubscription;
    private touchSubscription;
    private cellKeydownSubscription;
    private clickTimeout;
    rowClass: RowClassFn;
    constructor(detailsService: DetailsService, groupsService: GroupsService, changeNotification: ChangeNotificationService, editService: EditService, localization: LocalizationService, ngZone: NgZone, renderer: Renderer2, element: ElementRef, domEvents: DomEventsService, selectionService: SelectionService, cellSelectionService: CellSelectionService, columnInfoService: ColumnInfoService, navigationService: NavigationService);
    readonly newDataItem: any;
    readonly unlockedColumnsCount: number;
    isAriaSelected(item: any, column: ColumnBase): string;
    toggleRow(index: number, dataItem: any): boolean;
    isExpanded(viewItem: any): boolean;
    detailButtonStyles(viewItem: any): any;
    detailButtonTitle(viewItem: any): any;
    isGroup(item: GridItem): boolean;
    isDataItem(item: GridItem): boolean;
    isFooter(item: GridItem): boolean;
    isInExpandedGroup(item: DataItem): boolean;
    isParentGroupExpanded(item: any): boolean;
    isOdd(item: any): boolean;
    isSelectable(): boolean;
    isRowSelected(item: any): boolean;
    trackByWrapper(index: number, item: GridItem): any;
    trackByColumns(index: number, item: any): any;
    ngDoCheck(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    logicalRowIndex(rowIndex: number): number;
    addRowLogicalIndex(): number;
    logicalColIndex(column: any): number;
    ngOnInit(): void;
    ngOnDestroy(): void;
    isEditingCell(index: number, column: any): boolean;
    isEditingRow(index: number): boolean;
    readonly hasGroupHeaderColumn: boolean;
    readonly columnsContainer: any;
    readonly columnsSpan: number;
    readonly allColumnsSpan: number;
    readonly colSpan: number;
    readonly footerColumns: ColumnBase[];
    showGroupHeader(item: any): boolean;
    private readonly hasDetailTemplate;
    private clickHandler;
    private emitCellClick;
    private cellKeydownHandler;
    private cellClickArgs;
    private eventTarget;
}
