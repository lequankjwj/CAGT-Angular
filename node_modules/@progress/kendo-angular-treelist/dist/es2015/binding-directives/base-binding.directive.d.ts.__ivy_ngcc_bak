/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { SimpleChange, OnInit, OnDestroy, OnChanges, DoCheck } from '@angular/core';
import { State, CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { TreeListComponent } from '../treelist.component';
import { DataStateChangeEvent } from '../data/change-event-args.interface';
export declare abstract class BaseBindingDirective implements OnInit, OnDestroy, OnChanges, DoCheck {
    protected treelist: TreeListComponent;
    /**
     * Defines the descriptors by which the data will be sorted.
     */
    sort: SortDescriptor[];
    /**
     * Defines the descriptor by which the data will be filtered.
     */
    filter: CompositeFilterDescriptor;
    /**
     * Defines the descriptor by which the data will be filtered.
     */
    aggregate: any;
    protected state: State;
    protected abstract data: any;
    protected dataChanged: boolean;
    protected cache: any;
    protected originalData: any[];
    protected _aggregate: any;
    private subscriptions;
    constructor(treelist: TreeListComponent);
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    ngDoCheck(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    /**
     * @hidden
     */
    onStateChange(state: DataStateChangeEvent): void;
    /**
     * @hidden
     */
    rebind(): void;
    protected abstract getChildren(item?: any): any;
    protected abstract itemKey(item: any): any;
    protected applyState({ sort, filter }: State): void;
    protected fetchChildren(item?: any): any;
    protected hasChildren(item: any): boolean;
    protected filterItems(items: any): any[];
    protected calculateAggregates(items: any): any;
}
