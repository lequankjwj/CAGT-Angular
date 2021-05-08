/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, OnDestroy } from '@angular/core';
import { SelectableSettings, SelectionEvent } from './types';
import { RowSelectedFn } from '../rendering/common/row-class';
import { DomEventsService } from '../common/dom-events.service';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
import { NavigationService } from '../navigation/navigation.service';
/**
 * @hidden
 */
declare type SelectionServiceSettings = {
    rowSelected: RowSelectedFn;
    selectable: boolean | SelectableSettings;
    view: {
        accessor: Function;
        at: Function;
        length: Number;
    };
};
/**
 * @hidden
 */
export declare class SelectionService implements OnDestroy {
    private domEvents;
    private localDataChangesService?;
    private navigationService?;
    changes: EventEmitter<SelectionEvent>;
    lastSelectionStartIndex: number;
    currentSelection: any[];
    selectAllChecked: boolean;
    settings: SelectionServiceSettings;
    active: boolean;
    readonly enableMarquee: boolean;
    mouseDownEventArgs: any;
    dragging: boolean;
    private cellClickSubscription;
    private mousedownSubscription;
    private dataChangedSubscription;
    private _selectAllState;
    constructor(domEvents: DomEventsService, localDataChangesService?: LocalDataChangesService, navigationService?: NavigationService);
    init(settings: any): void;
    isSelected(index: number): boolean;
    handleClick(item: any, event: any): void;
    toggle(item: any): any;
    toggleByIndex(index: number): any;
    select(item: any): any;
    deselect(removedItem: any): void;
    addAllTo(item: any, ctrlKey: boolean): any;
    updateAll(selectAllChecked: boolean): void;
    selectRange(startIndex: number, endIndex: number): any;
    readonly selectAllState: any;
    readonly selected: number[];
    readonly options: SelectableSettings;
    ngOnDestroy(): void;
    targetArgs(): any;
    addSubscriptions(): void;
    private getIterator;
    private removeSubscriptions;
}
export {};
