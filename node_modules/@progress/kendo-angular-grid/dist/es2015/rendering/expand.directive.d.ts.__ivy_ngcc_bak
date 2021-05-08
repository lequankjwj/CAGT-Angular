/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, OnDestroy } from '@angular/core';
import { GridComponent } from '../grid.component';
import { Subscription } from 'rxjs';
import { RowArgs } from './common/row-args';
/**
 * A directive which controls the expanded state of the master detail rows.
 */
export declare class ExpandDetailsDirective implements OnDestroy {
    protected grid: GridComponent;
    /**
     * Fires when the expandedDetailKeys are changed.
     */
    expandedDetailKeysChange: EventEmitter<any[]>;
    /**
     * Defines the item key that will be stored in the `expandedDetailKeys` collection ([see example]({% slug master_detail_expanded_state_grid %}#toc-built-in-directive)).
     */
    expandDetailsKey: string | ((dataItem: any) => any);
    /**
     *
     * @hidden
     * A deprecated alias for setting the `expandDetailsKey` property.
     */
    expandDetailBy: string | ((dataItem: any) => any);
    /**
     * Defines the collection that will store the expanded keys.
     */
    expandedDetailKeys: any[];
    /**
     * Specifies if the items should be initially expanded.
     * @default false
     */
    initiallyExpanded: boolean;
    protected _expandBy: any;
    protected subscriptions: Subscription;
    constructor(grid: GridComponent);
    ngOnDestroy(): void;
    protected readonly keyGetter: any;
    /**
     * @hidden
     */
    isExpanded(args: RowArgs): boolean;
    private toggleState;
}
