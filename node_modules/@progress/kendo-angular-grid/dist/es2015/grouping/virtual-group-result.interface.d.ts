/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { GroupResult } from "@progress/kendo-data-query";
/**
 * Represents the group result which is used in virtual scrolling.
 */
export interface VirtualGroupResult extends GroupResult {
    /**
     * Determines if the group header will be rendered.
     */
    skipHeader: boolean;
    /**
     * Represents the absolute index of the current group.
     */
    offset: number;
}
