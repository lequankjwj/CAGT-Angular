/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PreventableEvent } from '../common/preventable-event';
/**
 * Arguments for the `columnReorder` event.
 */
export class ColumnReorderEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor({ column, newIndex, oldIndex }) {
        super();
        this.column = column;
        this.newIndex = newIndex;
        this.oldIndex = oldIndex;
    }
}
