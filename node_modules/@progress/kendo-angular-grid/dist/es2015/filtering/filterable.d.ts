/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Represents the options for the `filterable` setting of the Grid.
 */
export declare type FilterableSettings = boolean | 'row' | 'menu' | 'menu, row';
/**
 * @hidden
 */
export declare const isFilterable: (settings: FilterableSettings) => boolean;
/**
 * @hidden
 */
export declare const hasFilterMenu: (settings: FilterableSettings) => boolean;
/**
 * @hidden
 */
export declare const hasFilterRow: (settings: FilterableSettings) => boolean;
