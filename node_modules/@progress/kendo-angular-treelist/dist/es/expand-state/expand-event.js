/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { PreventableEvent } from '../common/preventable-event';
/**
 * Arguments for the TreeList expand and collapse events.
 */
var ExpandEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ExpandEvent, _super);
    /**
     * @hidden
     */
    function ExpandEvent(args) {
        var _this = _super.call(this) || this;
        _this.expand = args.expand;
        _this.dataItem = args.dataItem;
        return _this;
    }
    return ExpandEvent;
}(PreventableEvent));
export { ExpandEvent };
