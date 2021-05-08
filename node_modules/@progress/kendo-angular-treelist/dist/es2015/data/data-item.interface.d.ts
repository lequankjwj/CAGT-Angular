/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Represents a treelist item for a data row.
 */
export interface DataItem {
    /**
     * The type of the treelist item.
     */
    type: 'data';
    /**
     * A reference to the data item.
     */
    data: Object;
    /**
     * The index of the treelist item. Note that this could be different than the index of the data item in the source data set.
     */
    index: number;
    /**
     * A flag indicating if the item is currently being edited
     */
    isEditing: boolean;
}
