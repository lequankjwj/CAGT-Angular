/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var filter_service_1 = require("../filter.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var date_filter_component_1 = require("../date-filter.component");
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
var DateFilterCellComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DateFilterCellComponent, _super);
    function DateFilterCellComponent(filterService, localization) {
        var _this = _super.call(this, filterService, localization) || this;
        _this.localization = localization;
        /**
         * Determines if the drop-down filter operators will be displayed. The default value is `true`.
         * @type {boolean}
         */
        _this.showOperators = true;
        return _this;
    }
    DateFilterCellComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-treelist-date-filter-cell',
                    template: "\n        <kendo-treelist-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [showOperators]=\"showOperators\"\n            >\n            <kendo-datepicker\n                kendoFilterInput\n                [value]=\"currentFilter?.value\"\n                [format]=\"format\"\n                [formatPlaceholder]=\"formatPlaceholder\"\n                [placeholder]=\"placeholder\"\n                [activeView]=\"activeView\"\n                [bottomView]=\"bottomView\"\n                [topView]=\"topView\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [weekNumber]=\"weekNumber\"\n                >\n            </kendo-datepicker>\n        </kendo-treelist-filter-wrapper-cell>\n    "
                },] },
    ];
    /** @nocollapse */
    DateFilterCellComponent.ctorParameters = function () { return [
        { type: filter_service_1.FilterService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    DateFilterCellComponent.propDecorators = {
        showOperators: [{ type: core_1.Input }]
    };
    return DateFilterCellComponent;
}(date_filter_component_1.DateFilterComponent));
exports.DateFilterCellComponent = DateFilterCellComponent;
