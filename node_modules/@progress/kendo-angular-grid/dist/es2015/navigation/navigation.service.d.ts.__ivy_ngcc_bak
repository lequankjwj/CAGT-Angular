/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, EventEmitter, NgZone, OnDestroy } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Subject } from 'rxjs';
import { FocusRoot } from './focus-root';
import { FocusableDirective } from './focusable.directive';
import { LogicalCell } from './logical-cell.interface';
import { LogicalRow } from './logical-row.interface';
import { NavigationCell } from './navigation-cell.interface';
import { NavigationChange } from './navigation-change.interface';
import { NavigationMetadata } from './navigation-metadata';
import { NavigationRow } from './navigation-row.interface';
import { DomEventsService } from '../common/dom-events.service';
import { EditService } from '../editing/edit.service';
import { GroupsService } from '../grouping/groups.service';
import { PagerContextService } from '../pager/pager-context.service';
import { DetailsService } from '../rendering/details/details.service';
import { ScrollRequestService } from '../scrolling/scroll-request.service';
/**
 * @hidden
 */
export declare class NavigationViewport {
    firstItemIndex: number;
    lastItemIndex: number;
    constructor(firstItemIndex: number, lastItemIndex: number);
    containsRow(dataRowIndex: number): boolean;
    intersects(start: number, end: number): boolean;
}
/**
 * @hidden
 */
export declare class NavigationService implements OnDestroy {
    private zone;
    private domEvents;
    private pagerContextService;
    private scrollRequestService;
    private groupsService;
    private detailsService;
    private focusRoot;
    private editService;
    private cd;
    private localization;
    private focusableParent;
    readonly changes: Subject<NavigationChange>;
    readonly cellKeydown: EventEmitter<any>;
    metadata: NavigationMetadata;
    readonly enabled: boolean;
    readonly activeCell: NavigationCell;
    readonly activeRow: NavigationRow;
    viewport: NavigationViewport;
    columnViewport: NavigationViewport;
    private activeRowIndex;
    private alive;
    private active;
    private mode;
    private model;
    private cursor;
    private meta;
    private subs;
    private pendingRowIndex;
    private virtualCell;
    private readonly activeDataRow;
    constructor(zone: NgZone, domEvents: DomEventsService, pagerContextService: PagerContextService, scrollRequestService: ScrollRequestService, groupsService: GroupsService, detailsService: DetailsService, focusRoot: FocusRoot, editService: EditService, cd: ChangeDetectorRef, localization: LocalizationService, focusableParent: FocusableDirective);
    init(meta: NavigationMetadata): void;
    ngOnDestroy(): void;
    registerCell(cell: LogicalCell): void;
    registerCellOnCurrentRow(cell: LogicalCell): void;
    unregisterCell(index: number, rowIndex: number, cell: LogicalCell): void;
    registerRow(row: LogicalRow): void;
    updateRow(row: LogicalRow): void;
    unregisterRow(index: number, row: LogicalRow): void;
    isCellFocusable(cell: LogicalCell): boolean;
    isCellFocused(cell: LogicalCell): boolean;
    navigateTo(el: Element): void;
    tryFocus(el: Element): boolean;
    needsViewport(): boolean;
    setViewport(firstItemIndex: number, lastItemIndex: number): void;
    setColumnViewport(firstItemIndex: number, lastItemIndex: number): void;
    focusCell(rowIndex?: number, colIndex?: number): NavigationCell;
    focusCellByElement(el: Element): NavigationCell;
    focusNextCell(wrap?: boolean): NavigationCell;
    focusPrevCell(wrap?: boolean): NavigationCell;
    toggle(active: boolean): void;
    hasFocus(): boolean;
    autoFocusCell(start: number, end: number): boolean;
    private focusAdjacentCell;
    private enterCell;
    private leaveCell;
    private activateElements;
    private deactivateElements;
    private activateRow;
    private moveCursorFwd;
    private moveCursorBwd;
    private onCursorKeydown;
    private onContentKeydown;
    private onCellKeydown;
    private onCursorChanges;
    private onFocusOut;
    private onWindowBlur;
    private onKeydown;
    private onTabout;
}
