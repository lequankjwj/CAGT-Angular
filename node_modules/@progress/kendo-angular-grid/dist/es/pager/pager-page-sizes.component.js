/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
// tslint:disable:no-access-missing-member
import { Component, ChangeDetectorRef, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PagerContextService } from './pager-context.service';
/**
 * Displays a drop-down list for the page size selection ([see example]({% slug paging_grid %}#toc-pager-templates)).
 */
var PagerPageSizesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PagerPageSizesComponent, _super);
    function PagerPageSizesComponent(localization, cd, pagerContext) {
        var _this = _super.call(this, localization, pagerContext, cd) || this;
        _this.pagerContext = pagerContext;
        _this._pageSizes = [];
        return _this;
    }
    Object.defineProperty(PagerPageSizesComponent.prototype, "pageSizes", {
        get: function () {
            return this._pageSizes;
        },
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
        set: function (pageSizes) {
            var normalizedItems = [];
            pageSizes.forEach(function (item) {
                if (typeof item === 'number') {
                    normalizedItems.push({
                        text: item.toString(),
                        value: item
                    });
                }
                else {
                    normalizedItems.push(item);
                }
            });
            this._pageSizes = normalizedItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerPageSizesComponent.prototype, "classes", {
        /**
         * @hidden
         *
         * @readonly
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerPageSizesComponent.prototype, "showInitialPageSize", {
        /**
         * @hidden
         *
         * @readonly
         */
        get: function () {
            var _this = this;
            return this.pageSizes
                .filter(function (item) {
                if (typeof item.value === 'number') {
                    return item.value === Number(_this.pageSize);
                }
                return _this.total === Number(_this.pageSize);
            })
                .length === 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    PagerPageSizesComponent.prototype.pageSizeChange = function (value) {
        this.pageSize = parseInt(value, 10);
        this.pagerContext.changePageSize(this.pageSize);
    };
    /**
     * @hidden
     */
    PagerPageSizesComponent.prototype.getValue = function (page) {
        return typeof page.value === 'number' ? page.value : this.total;
    };
    /**
     * @hidden
     */
    PagerPageSizesComponent.prototype.getSelectedState = function (page) {
        if (typeof page.value === 'number') {
            return page.value === this.pageSize ? true : undefined;
        }
        return this.pageSize === this.total;
    };
    PagerPageSizesComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = typeof pageSize === 'number' ? pageSize : this.total;
        this.cd.markForCheck();
    };
    PagerPageSizesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-pager-page-sizes',
                    template: "\n        <select #select\n            (change)=\"pageSizeChange(select.value)\"\n            [attr.aria-label]=\"textFor('pagerItemsPerPage')\">\n            <option *ngIf=\"showInitialPageSize\" [value]=\"pageSize\">{{pageSize}}</option>\n            <option *ngFor=\"let page of pageSizes\" [value]=\"getValue(page)\" [selected]=\"getSelectedState(page)\">\n                {{page['text']}}\n            </option>\n        </select>\n        {{ textFor('pagerItemsPerPage') }}\n    "
                },] },
    ];
    /** @nocollapse */
    PagerPageSizesComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: PagerContextService }
    ]; };
    PagerPageSizesComponent.propDecorators = {
        pageSizes: [{ type: Input }],
        classes: [{ type: HostBinding, args: ['class.k-pager-sizes',] }, { type: HostBinding, args: ['class.k-label',] }]
    };
    return PagerPageSizesComponent;
}(PagerElementComponent));
export { PagerPageSizesComponent };
