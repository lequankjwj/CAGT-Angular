/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from '../filter.service';
/**
 * @hidden
 */
export class StringFilterMenuInputComponent {
    constructor() {
        this.operators = [];
    }
}
StringFilterMenuInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-string-filter-menu-input',
                template: `
        <kendo-treelist-filter-menu-input-wrapper
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [currentFilter]="currentFilter"
            [filterService]="filterService"
            >
            <input class="k-textbox" kendoFilterInput [filterDelay]="0" [ngModel]="currentFilter?.value" />
        </kendo-treelist-filter-menu-input-wrapper>
    `
            },] },
];
StringFilterMenuInputComponent.propDecorators = {
    operators: [{ type: Input }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    operator: [{ type: Input }],
    currentFilter: [{ type: Input }],
    filterService: [{ type: Input }]
};
