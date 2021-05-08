/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PreventableEvent } from '../common/preventable-event';
import { ColumnBase } from '../columns/column-base';
/**
 * Arguments for the `columnReorder` event.
 */
export declare class ColumnReorderEvent extends PreventableEvent {
    /**
     * The reordered column.
     */
    readonly column: ColumnBase;
    /**
     * The new index of the column.
     * Relative to the collection of columns.
     */
    readonly newIndex: number;
    /**
     * The original index of the column before reordering.
     * Relative to the collection of columns.
     */
    readonly oldIndex: number;
    /**
     * @hidden
     */
    constructor({ column, newIndex, oldIndex }: any);
}
