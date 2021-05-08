/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { GroupResult } from '@progress/kendo-data-query';
/**
 * Represents a group footer item of the Grid.
 */
export interface GroupFooterItem {
    /**
     * The type of the Grid item.
     */
    type: 'footer';
    /**
     * The group data.
     */
    data: GroupResult;
    /**
     * The index of the group item.
     */
    groupIndex: string;
    /**
     * The nesting level of the group. The root group is at level 0.
     */
    level: number;
}
