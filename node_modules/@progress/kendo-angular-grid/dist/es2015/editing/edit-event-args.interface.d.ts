/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { GridComponent } from "../grid.component";
/**
 * Arguments for the `remove` event.
 */
export interface EditEvent {
    /**
     * The data item.
     */
    dataItem: any;
    /**
     * Indicates if the data item is new or existing.
     */
    isNew: boolean;
    /**
     * The data row index for the operation.
     */
    rowIndex: number;
    /**
     * The `GridComponent` instance.
     */
    sender: GridComponent;
}
