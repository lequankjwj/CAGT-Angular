/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { PreventableEvent } from '../../common/preventable-event';
/**
 * Arguments for the `select` event of the Drawer.
 */
var DrawerSelectEvent = /** @class */ (function (_super) {
    tslib_1.__extends(DrawerSelectEvent, _super);
    function DrawerSelectEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DrawerSelectEvent;
}(PreventableEvent));
export { DrawerSelectEvent };
