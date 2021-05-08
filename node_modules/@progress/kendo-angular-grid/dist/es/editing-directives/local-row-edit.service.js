/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { LocalEditService } from './local-edit.service';
/**
 * @hidden
 */
var LocalRowEditService = /** @class */ (function (_super) {
    tslib_1.__extends(LocalRowEditService, _super);
    function LocalRowEditService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalRowEditService.prototype.update = function (_item) {
        this.dataChanged();
    };
    return LocalRowEditService;
}(LocalEditService));
export { LocalRowEditService };
