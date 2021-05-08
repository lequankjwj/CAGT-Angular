/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { GroupResult } from '@progress/kendo-data-query';
/**
 * Represents a group item in the Grid.
 */
export interface GroupItem {
    /**
     * The type of the Grid item.
     */
    type: 'group';
    /**
     * The group data.
     */
    data: GroupResult;
    /**
     * The index of the group item.
     */
    index: string;
    /**
     * The nesting level of the group. The root group is at level 0.
     */
    level: number;
}
