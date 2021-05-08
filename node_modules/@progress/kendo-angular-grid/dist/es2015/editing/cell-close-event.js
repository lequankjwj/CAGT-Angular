/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PreventableEvent } from '../common/preventable-event';
/**
 * Arguments for the `cellClose` event.
 */
export class CellCloseEvent extends PreventableEvent {
    constructor(options) {
        super();
        /**
         * @hidden
         */
        this.action = 'cellClose';
        Object.assign(this, options);
    }
}
