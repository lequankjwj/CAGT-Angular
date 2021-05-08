/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { DateFilterComponent } from '../date-filter.component';
/**
 * Represents a date-filter cell component.
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-treelist-column field="OrderDate" title="Order Date">
 *          <ng-template kendoTreeListFilterCellTemplate let-filter let-column="column">
 *          <kendo-treelist-date-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-treelist-date-filter-cell>
 *          </ng-template>
 *      </kendo-treelist-column>
 *   ```
 */
export class DateFilterCellComponent extends DateFilterComponent {
    constructor(filterService, localization) {
        super(filterService, localization);
        this.localization = localization;
        /**
         * Determines if the drop-down filter operators will be displayed. The default value is `true`.
         * @type {boolean}
         */
        this.showOperators = true;
    }
}
DateFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-date-filter-cell',
                template: `
        <kendo-treelist-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators"
            >
            <kendo-datepicker
                kendoFilterInput
                [value]="currentFilter?.value"
                [format]="format"
                [formatPlaceholder]="formatPlaceholder"
                [placeholder]="placeholder"
                [activeView]="activeView"
                [bottomView]="bottomView"
                [topView]="topView"
                [min]="min"
                [max]="max"
                [weekNumber]="weekNumber"
                >
            </kendo-datepicker>
        </kendo-treelist-filter-wrapper-cell>
    `
            },] },
];
/** @nocollapse */
DateFilterCellComponent.ctorParameters = () => [
    { type: FilterService },
    { type: LocalizationService }
];
DateFilterCellComponent.propDecorators = {
    showOperators: [{ type: Input }]
};
