/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from '../filter.service';
import { SinglePopupService } from '../../common/single-popup.service';
import { filter } from 'rxjs/operators';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class DateFilterMenuInputComponent {
    constructor(popupService, localizationService) {
        this.popupService = popupService;
        this.localizationService = localizationService;
        this.operators = [];
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    open(picker) {
        this.subscription = this.popupService.onClose
            .pipe(filter(() => picker.isActive))
            .subscribe(e => e.preventDefault());
    }
    messageFor(key) {
        return this.localizationService.get(key);
    }
}
DateFilterMenuInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-date-filter-menu-input',
                template: `
        <kendo-grid-filter-menu-input-wrapper
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [currentFilter]="currentFilter"
            [filterService]="filterService"
        >
            <kendo-datepicker
                #picker
                kendoFilterInput
                [filterDelay]="0"
                (open)="open(picker)"
                [value]="currentFilter?.value"
                [placeholder]="placeholder"
                [formatPlaceholder]="formatPlaceholder"
                [format]="format"
                [min]="min"
                [max]="max"
                [activeView]="activeView"
                [bottomView]="bottomView"
                [topView]="topView"
                [weekNumber]="weekNumber"
            >
                <kendo-datepicker-messages
                    [toggle]="messageFor('filterDateToggle')"
                    [today]="messageFor('filterDateToday')"
                >
                </kendo-datepicker-messages>
            </kendo-datepicker>
        </kendo-grid-filter-menu-input-wrapper>
    `
            },] },
];
/** @nocollapse */
DateFilterMenuInputComponent.ctorParameters = () => [
    { type: SinglePopupService },
    { type: LocalizationService }
];
DateFilterMenuInputComponent.propDecorators = {
    operators: [{ type: Input }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    operator: [{ type: Input }],
    currentFilter: [{ type: Input }],
    filterService: [{ type: Input }],
    format: [{ type: Input }],
    formatPlaceholder: [{ type: Input }],
    placeholder: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    activeView: [{ type: Input }],
    bottomView: [{ type: Input }],
    topView: [{ type: Input }],
    weekNumber: [{ type: Input }]
};
