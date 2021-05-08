/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TreeListComponent } from '../treelist.component';
import { PreventableEvent } from '../common/preventable-event';
/**
 * Arguments for the TreeList expand and collapse events.
 */
export declare class ExpandEvent extends PreventableEvent {
    /**
     * The expanded/collapsed data item.
     */
    dataItem: any;
    /**
     * The TreeList component that triggered the event.
     */
    sender: TreeListComponent;
    /**
     * @hidden
     */
    expand: boolean;
    /**
     * @hidden
     */
    constructor(args: any);
}
