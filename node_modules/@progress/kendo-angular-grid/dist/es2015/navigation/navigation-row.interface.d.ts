/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NavigationCell } from './navigation-cell.interface';
import { GroupItem } from '../data/group-item.interface';
/**
 * The metadata for a focusable Grid row. Focusable rows include
 * headers, group headers and footers, and data rows.
 */
export interface NavigationRow {
    /**
     * @hidden
     */
    uid: number;
    /**
     * The logical index of the focusable row.
     *
     * * Header rows are included, starting at index 0.
     * * Group headers and footers are included.
     * * The row indexing is absolute and does not change with paging.
     */
    index: number;
    /**
     * The data item index for this row.
     */
    dataRowIndex: number;
    /**
     * The data item for this row.
     */
    dataItem: any;
    /**
     * An array of focusable cells which are associated with this row.
     */
    cells: NavigationCell[];
    /**
     * @hidden
     */
    groupItem?: GroupItem;
}
