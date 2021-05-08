/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var column_component_1 = require("../../columns/column.component");
var filter_service_1 = require("../filter.service");
var single_popup_service_1 = require("../../common/single-popup.service");
var operators_1 = require("rxjs/operators");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * @hidden
 */
var DateFilterMenuInputComponent = /** @class */ (function () {
    function DateFilterMenuInputComponent(popupService, localizationService) {
        this.popupService = popupService;
        this.localizationService = localizationService;
        this.operators = [];
    }
    DateFilterMenuInputComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    DateFilterMenuInputComponent.prototype.open = function (picker) {
        this.subscription = this.popupService.onClose
            .pipe(operators_1.filter(function () { return picker.isActive; }))
            .subscribe(function (e) { return e.preventDefault(); });
    };
    DateFilterMenuInputComponent.prototype.messageFor = function (key) {
        return this.localizationService.get(key);
    };
    DateFilterMenuInputComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-grid-date-filter-menu-input',
                    template: "\n        <kendo-grid-filter-menu-input-wrapper\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [currentFilter]=\"currentFilter\"\n            [filterService]=\"filterService\"\n        >\n            <kendo-datepicker\n                #picker\n                kendoFilterInput\n                [filterDelay]=\"0\"\n                (open)=\"open(picker)\"\n                [value]=\"currentFilter?.value\"\n                [placeholder]=\"placeholder\"\n                [formatPlaceholder]=\"formatPlaceholder\"\n                [format]=\"format\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [activeView]=\"activeView\"\n                [bottomView]=\"bottomView\"\n                [topView]=\"topView\"\n                [weekNumber]=\"weekNumber\"\n            >\n                <kendo-datepicker-messages\n                    [toggle]=\"messageFor('filterDateToggle')\"\n                    [today]=\"messageFor('filterDateToday')\"\n                >\n                </kendo-datepicker-messages>\n            </kendo-datepicker>\n        </kendo-grid-filter-menu-input-wrapper>\n    "
                },] },
    ];
    /** @nocollapse */
    DateFilterMenuInputComponent.ctorParameters = function () { return [
        { type: single_popup_service_1.SinglePopupService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    DateFilterMenuInputComponent.propDecorators = {
        operators: [{ type: core_1.Input }],
        column: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        operator: [{ type: core_1.Input }],
        currentFilter: [{ type: core_1.Input }],
        filterService: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        formatPlaceholder: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        activeView: [{ type: core_1.Input }],
        bottomView: [{ type: core_1.Input }],
        topView: [{ type: core_1.Input }],
        weekNumber: [{ type: core_1.Input }]
    };
    return DateFilterMenuInputComponent;
}());
exports.DateFilterMenuInputComponent = DateFilterMenuInputComponent;
