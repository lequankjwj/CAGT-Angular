/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, ChangeDetectorRef } from '@angular/core';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { BooleanFilterComponent } from '../boolean-filter.component';
/**
 * Represents a Boolean filter-cell component.
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-treelist-column field="ProductName" title="Product Name">
 *          <ng-template kendoTreeListFilterCellTemplate let-filter let-column="column">
 *          <kendo-treelist-boolean-filter-cell
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-treelist-boolean-filter-cell>
 *          </ng-template>
 *      </kendo-treelist-column>
 *   ```
 */
var BooleanFilterCellComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BooleanFilterCellComponent, _super);
    function BooleanFilterCellComponent(filterService, localization, cd) {
        var _this = _super.call(this, filterService, localization) || this;
        _this.cd = cd;
        return _this;
    }
    BooleanFilterCellComponent.prototype.localizationChange = function () {
        _super.prototype.localizationChange.call(this);
        this.cd.markForCheck();
    };
    BooleanFilterCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-treelist-boolean-filter-cell',
                    template: "\n        <kendo-treelist-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [showOperators]=\"false\"\n            [defaultOperator]=\"operator\">\n            <kendo-dropdownlist\n                kendoFilterInput\n                [defaultItem]=\"defaultItem\"\n                [data]=\"items\"\n                textField=\"text\"\n                valueField=\"value\"\n                [popupSettings]=\"{ width: 'auto' }\"\n                [valuePrimitive]=\"true\"\n                [value]=\"currentFilter?.value\">\n            </kendo-dropdownlist>\n        </kendo-treelist-filter-wrapper-cell>\n    "
                },] },
    ];
    /** @nocollapse */
    BooleanFilterCellComponent.ctorParameters = function () { return [
        { type: FilterService },
        { type: LocalizationService },
        { type: ChangeDetectorRef }
    ]; };
    return BooleanFilterCellComponent;
}(BooleanFilterComponent));
export { BooleanFilterCellComponent };
