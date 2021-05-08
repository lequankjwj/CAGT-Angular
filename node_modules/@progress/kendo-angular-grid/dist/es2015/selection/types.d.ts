/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ColumnComponent } from './../columns/column.component';
import { RowArgs } from './../rendering/common/row-args';
/**
 * Represents the callback that is used by the
 * [`cellSelected`]({% slug api_grid_gridcomponent %}#toc-cellselected) property.
 */
export declare type CellSelectedFn = (row: RowArgs, column: ColumnComponent, colIndex: number) => {
    selected: boolean;
    item: CellSelectionItem;
};
/**
 * The returned type of the `selection` event
 * ([see example]({% slug selection_grid %}#toc-in-combination-with-the-select-all-feature)).
 */
export interface SelectionEvent {
    /**
     * The row items that were added to the selection.
     */
    selectedRows?: RowArgs[];
    /**
     * The row items that were removed from the selection.
     */
    deselectedRows?: RowArgs[];
    /**
     * The cell items that were added to the selection.
     */
    selectedCells?: CellSelectionItem[];
    /**
     * The cell items that were removed from the selection.
     */
    deselectedCells?: CellSelectionItem[];
    /**
     * Shows the state of the `Ctrl` key (or the `Command` key on a Mac) during the selection.
     */
    ctrlKey?: boolean;
    /**
     * Shows the state of the `Shift` key during the selection.
     */
    shiftKey?: boolean;
}
/**
 * The settings for the selection functionality of the Grid ([more information and example]({% slug selection_grid %}#toc-setup)).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData" [selectable]="{ checkboxOnly: true, mode: 'multiple' }">
 *          <kendo-grid-column field="ProductID" title="Product ID">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
 *          </kendo-grid-column>
 *        </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *    public gridData: any[];
 *
 *    constructor() {
 *        this.gridData = products;
 *    }
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 *
 * ```
 */
export interface SelectableSettings {
    /**
     * Determines if selection is allowed.
     *
     * @default true
     */
    enabled?: boolean;
    /**
     * Determines if the selection is performed only through clicking a checkbox.
     * If enabled, clicking the row itself will not select the row.
     * Applicable if at least one checkbox column is present.
     *
     * @default true
     */
    checkboxOnly?: boolean;
    /**
     * The available values are:
     * * `single`
     * * `multiple`
     *
     * @default "multiple"
     */
    mode?: SelectableMode;
    /**
     * Determines if cell selection is allowed.
     *
     * @default false
     */
    cell?: boolean;
    /**
     * Determines if drag selection is allowed.
     *
     * @default false
     */
    drag?: boolean;
}
/**
 * Represents the available selection modes.
 */
export declare type SelectableMode = "single" | "multiple";
/**
 * Represents the possible states of the select-all checkbox.
 */
export declare type SelectAllCheckboxState = "checked" | "unchecked" | "indeterminate";
/**
 * The Grid `cell` selection items type.
 */
export interface CellSelectionItem {
    /**
     * The key that identifies the selected item.
     */
    itemKey?: any;
    /**
     * The key that identifies the selected item column.
     */
    columnKey?: any;
}
