/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Represents a grid item for a data row.
 */
export interface DataItem {
    /**
     * The type of the grid item.
     */
    type: 'data';
    /**
     * A reference to the data item.
     */
    data: Object;
    /**
     * The index of the grid item. Note that this could be different than the index of the data item in the source data set.
     */
    index: number;
    /**
     * The group index, if any.
     */
    groupIndex: string;
    /**
     * A flag indicating if the item is currently being edited
     */
    isEditing: boolean;
}
