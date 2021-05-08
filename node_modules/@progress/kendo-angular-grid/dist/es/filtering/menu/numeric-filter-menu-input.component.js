/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from '../filter.service';
/**
 * @hidden
 */
var NumericFilterMenuInputComponent = /** @class */ (function () {
    function NumericFilterMenuInputComponent(localization) {
        this.localization = localization;
        this.operators = [];
        /**
         * Specifies the value which is used to increment or decrement the component value.
         * @type {numeric}
         */
        this.step = 1;
        /**
         * Specifies whether the **Up** and **Down** spin buttons will be rendered.
         * @type {boolean}
         */
        this.spinners = true;
    }
    NumericFilterMenuInputComponent.prototype.messageFor = function (key) {
        return this.localization.get(key);
    };
    NumericFilterMenuInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-numeric-filter-menu-input',
                    template: "\n        <kendo-grid-filter-menu-input-wrapper\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [currentFilter]=\"currentFilter\"\n            [filterService]=\"filterService\"\n        >\n            <kendo-numerictextbox\n                kendoFilterInput\n                [filterDelay]=\"0\"\n                [autoCorrect]=\"true\"\n                [value]=\"currentFilter?.value\"\n                [format]=\"format\"\n                [decimals]=\"decimals\"\n                [spinners]=\"spinners\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [step]=\"step\"\n            >\n                <kendo-numerictextbox-messages\n                    [increment]=\"messageFor('filterNumericIncrement')\"\n                    [decrement]=\"messageFor('filterNumericDecrement')\"\n                >\n                </kendo-numerictextbox-messages>\n            </kendo-numerictextbox>\n        </kendo-grid-filter-menu-input-wrapper>\n    "
                },] },
    ];
    /** @nocollapse */
    NumericFilterMenuInputComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    NumericFilterMenuInputComponent.propDecorators = {
        operators: [{ type: Input }],
        column: [{ type: Input }],
        filter: [{ type: Input }],
        operator: [{ type: Input }],
        currentFilter: [{ type: Input }],
        filterService: [{ type: Input }],
        step: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        spinners: [{ type: Input }],
        decimals: [{ type: Input }],
        format: [{ type: Input }]
    };
    return NumericFilterMenuInputComponent;
}());
export { NumericFilterMenuInputComponent };
