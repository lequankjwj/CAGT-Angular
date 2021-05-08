/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PreventableEvent } from '../../common/preventable-event';
/**
 * Arguments for the `detailExpand` event.
 */
export declare class DetailExpandEvent extends PreventableEvent {
    /**
     * The expanded row `dataItem`.
     */
    dataItem: any;
    /**
     * The expanded row index.
     */
    index: number;
    constructor(args: any);
}
