/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, OnDestroy } from '@angular/core';
import { DomEventsService } from '../common/dom-events.service';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
import { CellSelectedFn, SelectionEvent, SelectableSettings, CellSelectionItem } from './types';
import { ColumnBase } from '../columns/column-base';
import { NavigationService } from '../navigation/navigation.service';
/**
 * @hidden
 */
declare type CellSelectionServiceSettings = {
    cellSelected: CellSelectedFn;
    selectable: boolean | SelectableSettings;
    view: {
        accessor: Function;
        at: Function;
        length: Number;
    };
    columns: ColumnBase[];
};
/**
 * @hidden
 */
export declare class CellSelectionService implements OnDestroy {
    private domEvents;
    private localDataChangesService?;
    private navigationService?;
    changes: EventEmitter<SelectionEvent>;
    mouseUpEvent: EventEmitter<any>;
    currentSelection: CellSelectionItem[];
    settings: CellSelectionServiceSettings;
    active: boolean;
    readonly enableMarquee: boolean;
    mouseDownEventArgs: any;
    mouseUpEventArgs: any;
    dragging: boolean;
    dragSelectDeselect: boolean;
    lastSelectionItem: CellSelectionItem;
    lastSelectionItemRowIndex: number;
    lastSelectionItemColIndex: number;
    private cellClickSubscription;
    private dataChangedSubscription;
    private mousedownSubscription;
    constructor(domEvents: DomEventsService, localDataChangesService?: LocalDataChangesService, navigationService?: NavigationService);
    init(settings: any): void;
    isCellSelected(item: any, col: any): boolean;
    handleClick(item: any, event: any): void;
    toggle(item: any): any;
    select(item: any): any;
    deselect(removedItem: any): void;
    selectRange(startRowIndex: number, startColIndex: number, endRowIndex: number, endColIndex: number): any;
    readonly options: SelectableSettings;
    ngOnDestroy(): void;
    addSubscriptions(): void;
    private getIterator;
    private removeSubscriptions;
}
export {};
