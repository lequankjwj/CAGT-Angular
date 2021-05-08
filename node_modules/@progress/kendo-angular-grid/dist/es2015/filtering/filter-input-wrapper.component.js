/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Input, ContentChild } from "@angular/core";
import { ColumnComponent } from "../columns/column.component";
import { FilterInputDirective } from "./filter-input.directive";
import { isPresent, isNullOrEmptyString, isBlank, isChanged } from "../utils";
import { BaseFilterCellComponent } from "./base-filter-cell.component";
const EMPTY_VALUE_OPERATORS = new Set(['isnull', 'isnotnull', 'isempty', 'isnotempty']);
const isEmptyValueOperator = (operator) => EMPTY_VALUE_OPERATORS.has(operator);
const ɵ0 = isEmptyValueOperator;
/**
 * @hidden
 */
export class FilterInputWrapperComponent extends BaseFilterCellComponent {
    constructor(filterService) {
        super(filterService);
        this.operators = [];
    }
    get currentFilter() {
        return this.filterByField(this.column.field);
    }
    get currentOperator() {
        const filter = this.currentFilter;
        if (!this._operator) {
            this._operator = filter ? filter.operator : this.defaultOperator;
        }
        return this._operator;
    }
    set currentOperator(value) {
        this._operator = value;
        const emptyValueOperator = isEmptyValueOperator(value);
        this.filterInputDisabled = emptyValueOperator;
        if (emptyValueOperator) {
            this.applyNoValueFilter(value);
        }
        else if (!isBlank(value) && isPresent(this.currentFilter)) {
            this.onChange(this.currentFilter.value);
        }
    }
    get defaultOperator() {
        if (!isNullOrEmptyString(this._defaultOperator)) {
            return this._defaultOperator;
        }
        else if (this.operators && this.operators.length) {
            return this.operators[0].value;
        }
        return "eq";
    }
    set defaultOperator(value) {
        this._defaultOperator = value;
    }
    set filterInputDisabled(disabled) {
        if (!this.input) {
            return;
        }
        this.input.disabled = disabled;
    }
    ngAfterContentInit() {
        if (isPresent(this.input)) {
            this.changeSubscription = this.input.change.subscribe(this.onChange.bind(this));
            this.filterInputDisabled = isEmptyValueOperator(this.currentOperator);
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.changeSubscription) {
            this.changeSubscription.unsubscribe();
        }
    }
    onChange(value) {
        if (!isNullOrEmptyString(value) || this.filterByField(this.column.field)) {
            this.filterChange(isNullOrEmptyString(value) ?
                this.removeFilter(this.column.field) :
                this.updateFilter({
                    field: this.column.field,
                    operator: this.currentOperator,
                    value: value
                }));
        }
    }
    onClear() {
        this.onChange(null);
        this.filterInputDisabled = isEmptyValueOperator(this.defaultOperator);
    }
    applyNoValueFilter(operator) {
        this.filterChange(this.updateFilter({
            field: this.column.field,
            operator: operator,
            value: null
        }));
    }
    ngOnChanges(changes) {
        if (isChanged("filter", changes, false)) {
            this._operator = null;
            this.filterInputDisabled = isEmptyValueOperator(this.currentOperator);
        }
    }
}
FilterInputWrapperComponent.propDecorators = {
    operators: [{ type: Input }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    input: [{ type: ContentChild, args: [FilterInputDirective,] }],
    defaultOperator: [{ type: Input }]
};
export { ɵ0 };
