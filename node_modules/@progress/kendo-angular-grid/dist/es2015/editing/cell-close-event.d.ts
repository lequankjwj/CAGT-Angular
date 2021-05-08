/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PreventableEvent } from '../common/preventable-event';
import { EditEvent } from "./edit-event-args.interface";
import { GridComponent } from "../grid.component";
/**
 * Arguments for the `cellClose` event.
 */
export declare class CellCloseEvent extends PreventableEvent implements EditEvent {
    isNew: boolean;
    dataItem: any;
    rowIndex: number;
    sender: GridComponent;
    /**
     * @hidden
     */
    action: string;
    /**
     * The Grid column that will be closed.
     */
    column: any;
    /**
     * The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }}) that is used to edit the cell which will be closed.
     */
    formGroup: any;
    /**
     * The DOM event that caused the `cellClose` event.
     * May not be present if `cellClose` was caused by an API call.
     */
    originalEvent: any;
    constructor(options: any);
}
