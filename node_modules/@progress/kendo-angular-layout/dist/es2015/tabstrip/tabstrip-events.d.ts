/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PreventableEvent } from '../common/preventable-event';
/**
 * Arguments for the `select` event of the TabStrip.
 * The `select` event fires when a tab is selected (clicked).
 */
export declare class SelectEvent extends PreventableEvent {
    index: number;
    title: string;
    /**
     * Constructs the event arguments for the `select` event.
     * @param index - The index of the selected tab.
     * @param title - The title of the selected tab.
     */
    constructor(index: number, title: string);
}
