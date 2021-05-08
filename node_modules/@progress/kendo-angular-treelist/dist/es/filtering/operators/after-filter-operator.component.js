/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/*
 * Represents the `Greater` (**Is after**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
 */
var AfterFilterOperatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AfterFilterOperatorComponent, _super);
    function AfterFilterOperatorComponent(localization) {
        return _super.call(this, "after", localization) || this;
    }
    /**
     * @hidden
     */
    AfterFilterOperatorComponent.prototype.toJSON = function () {
        return {
            text: this.text,
            value: "gt"
        };
    };
    AfterFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return AfterFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-after-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    AfterFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return AfterFilterOperatorComponent;
}(FilterOperatorBase));
export { AfterFilterOperatorComponent };
