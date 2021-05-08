/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arguments for the `columnVisibilityChange` event.
 */
var ColumnVisibilityChangeEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function ColumnVisibilityChangeEvent(columns) {
        this.columns = columns;
    }
    return ColumnVisibilityChangeEvent;
}());
exports.ColumnVisibilityChangeEvent = ColumnVisibilityChangeEvent;
