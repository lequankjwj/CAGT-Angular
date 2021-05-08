/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PagerContextService, PagerContextChanges } from './pager-context.service';
import { PageSizeItem } from './pagesize-item.interface';
/**
 * Displays a drop-down list for the page size selection ([see example]({% slug paging_grid %}#toc-pager-templates)).
 */
export declare class PagerPageSizesComponent extends PagerElementComponent {
    protected pagerContext: PagerContextService;
    /**
    * The page sizes collection. Can be an Array of numbers and/or PageSizeItem objects.
    *
    * @example
    * ```ts-preview
    * _@Component({
    *    selector: 'my-app',
    *    template: `
    *        <kendo-grid [kendoGridBinding]="gridData" [height]="200"
    *           [pageable]="true"
    *            [pageSize]="pageSize">
    *            <ng-template kendoPagerTemplate let-totalPages="totalPages" let-currentPage="currentPage">
    *                <kendo-pager-page-sizes [pageSizes]="pagesizes"></kendo-pager-page-sizes>
    *            </ng-template>
    *        </kendo-grid>
    *    `
    * })
    * class AppComponent {
    *    public gridData: any[] = products;
    *    public pageSize = 2;
    *    public pagesizes = [{text: 'One', value: 1}, {text: 'Two', value: 2}, {text: 'All', value : 'all'}];
    * }
    *
    * const products = [{
    *   'ProductID' : 1,
    *   'ProductName' : "Chai",
    *   'SupplierID' : 1,
    *   'CategoryID' : 1,
    *   'QuantityPerUnit' : "10 boxes x 20 bags",
    *   'UnitPrice' : 18.0000,
    *   'UnitsInStock' : 39,
    *   'UnitsOnOrder' : 0,
    *   'ReorderLevel' : 10,
    *   'Discontinued' : false
    *
    * }, {
    *   'ProductID' : 2,
    *   'ProductName' : "Chang",
    *   'SupplierID' : 1,
    *   'CategoryID' : 1,
    *   'QuantityPerUnit' : "24 - 12 oz bottles",
    *   'UnitPrice' : 19.0000,
    *   'UnitsInStock' : 17,
    *   'UnitsOnOrder' : 40,
    *   'ReorderLevel' : 25,
    *   'Discontinued' : false
    * }, {
    *   'ProductID' : 3,
    *   'ProductName' : "Aniseed Syrup",
    *   'SupplierID' : 1,
    *   'CategoryID' : 2,
    *   'QuantityPerUnit' : "12 - 550 ml bottles",
    *   'UnitPrice' : 10.0000,
    *   'UnitsInStock' : 13,
    *   'UnitsOnOrder' : 70,
    *   'ReorderLevel' : 25,
    *   'Discontinued' : false
    * }, {
    *   'ProductID' : 4,
    *   'ProductName' : "Chef Anton\'s Cajun Seasoning",
    *   'SupplierID' : 2,
    *  'CategoryID' : 2,
    *   'QuantityPerUnit' : "48 - 6 oz jars",
    *   'UnitPrice' : 22.0000,
    *   'UnitsInStock' : 53,
    *   'UnitsOnOrder' : 0,
    *   'ReorderLevel' : 0,
    *   'Discontinued' : false
    * }, {
    *   'ProductID' : 5,
    *   'ProductName' : "Chef Anton\'s Gumbo Mix",
    *   'SupplierID' : 2,
    *   'CategoryID' : 2,
    *   'QuantityPerUnit' : "36 boxes",
    *   'UnitPrice' : 21.3500,
    *   'UnitsInStock' : 0,
    *   'UnitsOnOrder' : 0,
    *   'ReorderLevel' : 0,
    *   'Discontinued' : true
    * }, {
    *   'ProductID' : 6,
    *   'ProductName' : "Grandma\'s Boysenberry Spread",
    *   'SupplierID' : 3,
    *   'CategoryID' : 2,
    *   'QuantityPerUnit' : "12 - 8 oz jars",
    *   'UnitPrice' : 25.0000,
    *   'UnitsInStock' : 120,
    *   'UnitsOnOrder' : 0,
    *   'ReorderLevel' : 25,
    *   'Discontinued' : false
    * }];
    * ```
    */
    pageSizes: Array<PageSizeItem | number>;
    /**
     * @hidden
     *
     * @readonly
     */
    readonly classes: boolean;
    /**
     * @hidden
     *
     * @readonly
     */
    readonly showInitialPageSize: boolean;
    private _pageSizes;
    constructor(localization: LocalizationService, cd: ChangeDetectorRef, pagerContext: PagerContextService);
    /**
     * @hidden
     */
    pageSizeChange(value: any): void;
    /**
     * @hidden
     */
    getValue(page: PageSizeItem): number;
    /**
     * @hidden
     */
    getSelectedState(page: PageSizeItem): boolean | undefined;
    protected onChanges({ total, skip, pageSize }: PagerContextChanges): void;
}
