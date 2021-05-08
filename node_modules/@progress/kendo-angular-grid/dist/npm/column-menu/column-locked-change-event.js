/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arguments for the `columnLockedChange` event.
 */
var ColumnLockedChangeEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function ColumnLockedChangeEvent(columns) {
        this.columns = columns;
    }
    return ColumnLockedChangeEvent;
}());
exports.ColumnLockedChangeEvent = ColumnLockedChangeEvent;
