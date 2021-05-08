/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_filter_cell_component_1 = require("./string-filter-cell.component");
var numeric_filter_cell_component_1 = require("./numeric-filter-cell.component");
var boolean_filter_cell_component_1 = require("./boolean-filter-cell.component");
var date_filter_cell_component_1 = require("./date-filter-cell.component");
/**
 * @hidden
 *
 * > List the following components in the TreeListModule as `entryComponents`.
 */
exports.filterComponentFactory = function (type) { return ({
    "boolean": boolean_filter_cell_component_1.BooleanFilterCellComponent,
    "date": date_filter_cell_component_1.DateFilterCellComponent,
    "numeric": numeric_filter_cell_component_1.NumericFilterCellComponent,
    "text": string_filter_cell_component_1.StringFilterCellComponent
}[type]); };
