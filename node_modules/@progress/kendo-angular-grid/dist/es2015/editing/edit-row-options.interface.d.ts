/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Additional options for the [`editRow`]({% slug api_grid_gridcomponent %}#toc-editrow) method. [See example.]({% slug editing_rowclick_grid %}#toc-managing-focus)
 */
export interface EditRowOptions {
    /**
     * Determines if focusing the row's edit element should be skipped. Defaults to `false`.
     */
    skipFocus?: boolean;
    /**
     * Specifies which particular column should be focused after the row editor opens.
     * By default, the first column receives focus.
     */
    columnIndex?: number;
}
