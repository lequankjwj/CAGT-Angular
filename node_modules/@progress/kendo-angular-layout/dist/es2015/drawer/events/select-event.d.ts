/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DrawerComponent } from '../drawer.component';
import { PreventableEvent } from '../../common/preventable-event';
/**
 * Arguments for the `select` event of the Drawer.
 */
export declare class DrawerSelectEvent extends PreventableEvent {
    /**
     * The index of the selected item in the `items` collection.
     */
    index: number;
    /**
     * The selected Drawer item.
     */
    item: any;
    /**
     * The DOM event that triggered the selection.
     */
    originalEvent: any;
    /**
     * The Drawer that triggered the event.
     */
    sender: DrawerComponent;
}
