/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { PreventableEvent } from '../../common/preventable-event';
/**
 * Arguments for the `detailCollapse` event.
 */
var DetailCollapseEvent = /** @class */ (function (_super) {
    tslib_1.__extends(DetailCollapseEvent, _super);
    function DetailCollapseEvent(args) {
        var _this = _super.call(this) || this;
        Object.assign(_this, args);
        return _this;
    }
    return DetailCollapseEvent;
}(PreventableEvent));
export { DetailCollapseEvent };
