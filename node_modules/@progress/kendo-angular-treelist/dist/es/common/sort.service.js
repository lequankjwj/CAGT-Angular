/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from 'rxjs';
/**
 * @hidden
 */
var SortService = /** @class */ (function () {
    function SortService() {
        this.changes = new Subject();
    }
    SortService.prototype.sort = function (value) {
        this.changes.next(value);
    };
    return SortService;
}());
export { SortService };
