/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from 'rxjs';
/**
 * Represents a service to set the filter descriptor
 * ([see example]({% slug reusablecustomfilters_grid %})).
 */
var FilterService = /** @class */ (function () {
    function FilterService() {
        /**
         * Fires when the filter descriptors is set.
         */
        this.changes = new Subject();
    }
    /**
     * Sets the filter descriptor.
     *
     * @param {CompositeFilterDescriptor} value - The filter descriptor that will be set.
     */
    FilterService.prototype.filter = function (value) {
        this.changes.next(value);
    };
    return FilterService;
}());
export { FilterService };
