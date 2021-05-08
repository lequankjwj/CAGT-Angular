/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PreventableEvent } from '../../common/preventable-event';
/**
 * Arguments for the `detailCollapse` event.
 */
export declare class DetailCollapseEvent extends PreventableEvent {
    /**
     * The collapsed row `dataItem`.
     */
    dataItem: any;
    /**
     * The collapsed row index.
     */
    index: number;
    constructor(args: any);
}
