/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PreventableEvent } from '../common/preventable-event';
/**
 * Arguments for the TreeList expand and collapse events.
 */
export class ExpandEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(args) {
        super();
        this.expand = args.expand;
        this.dataItem = args.dataItem;
    }
}
