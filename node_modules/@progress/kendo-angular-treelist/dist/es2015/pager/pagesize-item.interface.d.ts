/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
export interface PageSizeItem {
    /**
     * The text that will be displayed in the pager PageSize select for each option
     */
    text: string;
    /**
     * The value that will be used as page size. When the value is `all`, the page size will be set to match the TreeList data `total`
     */
    value: number | 'all';
}
