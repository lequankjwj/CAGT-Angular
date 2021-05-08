/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * The settings of the column menu in the TreeList component.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/chooser/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
export interface ColumnMenuSettings {
    /**
     * Specifies if the columns can be sorted in the column menu.
     * If [sorting]({% slug api_treelist_treelistcomponent %}#toc-sortable) is enabled, defaults to `true`.
     * @default true
     */
    sort?: boolean;
    /**
     * Specifies if the columns can be filtered in the column menu.
     * If [filtering]({% slug api_treelist_treelistcomponent %}#toc-filterable) is enabled, defaults to `true`.
     * @default true
     */
    filter?: boolean;
    /**
     * Specifies if the item for column selection will be displayed in the column menu.
     * @default true
     */
    columnChooser?: boolean;
    /**
     * Specifies if the columns can be locked and unlocked from the column menu.
     * This option follows the prerequisites and limitations of the [locked columns]({% slug locked_columns_treelist %}).
     * @default false
     */
    lock?: boolean;
}
