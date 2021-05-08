/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { PreventableEvent } from '../common/preventable-event';
/**
 * Arguments for the `select` event of the TabStrip.
 * The `select` event fires when a tab is selected (clicked).
 */
var SelectEvent = /** @class */ (function (_super) {
    tslib_1.__extends(SelectEvent, _super);
    /**
     * Constructs the event arguments for the `select` event.
     * @param index - The index of the selected tab.
     * @param title - The title of the selected tab.
     */
    function SelectEvent(index, title) {
        var _this = _super.call(this) || this;
        _this.index = index;
        _this.title = title;
        return _this;
    }
    return SelectEvent;
}(PreventableEvent));
export { SelectEvent };
