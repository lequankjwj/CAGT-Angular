/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DataItem } from './data-item.interface';
import { GroupItem } from './group-item.interface';
import { GroupFooterItem } from './group-footer-item.interface';
/**
 * Represents an item that will be rendered by the Grid.
 * Can be a [`DataItem`]({% slug api_grid_dataitem %}), a [`GroupItem`]({% slug api_grid_groupitem %}),
 * or a [`GroupFooterItem`]({% slug api_grid_groupfooteritem %}). ([See example]({% slug api_grid_gridcomponent %}#toc-trackby))
 */
export declare type GridItem = DataItem | GroupItem | GroupFooterItem;
