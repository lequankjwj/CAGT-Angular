/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PreventableEvent } from '../../common/preventable-event';
/**
 * Arguments for the `detailExpand` event.
 */
export class DetailExpandEvent extends PreventableEvent {
    constructor(args) {
        super();
        Object.assign(this, args);
    }
}
