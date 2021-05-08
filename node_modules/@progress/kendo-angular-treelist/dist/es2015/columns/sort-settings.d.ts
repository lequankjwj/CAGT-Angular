/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Defines the settings for sorting the TreeList column.
 */
export declare type ColumnSortSettings = boolean | {
    /**
     * Enables the removal of the column sorting.
     */
    allowUnsort?: boolean;
    /**
     * Determines the initial (from the unsorted to the sorted state) sort direction.
     *
     * The available values for setting the initial sort direction are:
     * - `asc` (default)
     * - `desc`
     */
    initialDirection?: 'asc' | 'desc';
};
/**
 * Defines the settings for sorting the TreeList.
 */
export declare type SortSettings = boolean | ColumnSortSettings & {
    /**
     * The sort mode of the TreeList.
     *
     * The available values for setting the sort modes are:
     * - `single`
     * - `multiple`
     */
    mode?: 'single' | 'multiple';
    /**
     * Enables the sort-sequence indicators for sorting multiple columns.
     */
    showIndexes?: boolean;
};
/**
 * @hidden
 */
export declare const normalize: (...settings: (boolean | {
    /**
     * Enables the removal of the column sorting.
     */
    allowUnsort?: boolean;
    /**
     * Determines the initial (from the unsorted to the sorted state) sort direction.
     *
     * The available values for setting the initial sort direction are:
     * - `asc` (default)
     * - `desc`
     */
    initialDirection?: "desc" | "asc";
} | (true & {
    /**
     * The sort mode of the TreeList.
     *
     * The available values for setting the sort modes are:
     * - `single`
     * - `multiple`
     */
    mode?: "single" | "multiple";
    /**
     * Enables the sort-sequence indicators for sorting multiple columns.
     */
    showIndexes?: boolean;
}) | (false & {
    /**
     * The sort mode of the TreeList.
     *
     * The available values for setting the sort modes are:
     * - `single`
     * - `multiple`
     */
    mode?: "single" | "multiple";
    /**
     * Enables the sort-sequence indicators for sorting multiple columns.
     */
    showIndexes?: boolean;
}) | ({
    /**
     * Enables the removal of the column sorting.
     */
    allowUnsort?: boolean;
    /**
     * Determines the initial (from the unsorted to the sorted state) sort direction.
     *
     * The available values for setting the initial sort direction are:
     * - `asc` (default)
     * - `desc`
     */
    initialDirection?: "desc" | "asc";
} & {
    /**
     * The sort mode of the TreeList.
     *
     * The available values for setting the sort modes are:
     * - `single`
     * - `multiple`
     */
    mode?: "single" | "multiple";
    /**
     * Enables the sort-sequence indicators for sorting multiple columns.
     */
    showIndexes?: boolean;
}))[]) => any;
