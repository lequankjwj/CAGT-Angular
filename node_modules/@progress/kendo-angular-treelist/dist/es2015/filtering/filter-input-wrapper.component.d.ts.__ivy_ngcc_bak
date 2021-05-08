/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { SimpleChange } from "@angular/core";
import { ColumnComponent } from "../columns/column.component";
import { CompositeFilterDescriptor, FilterDescriptor } from "@progress/kendo-data-query";
import { FilterInputDirective } from "./filter-input.directive";
import { BaseFilterCellComponent } from "./base-filter-cell.component";
import { FilterService } from "./filter.service";
/**
 * @hidden
 */
export declare abstract class FilterInputWrapperComponent extends BaseFilterCellComponent {
    operators: Array<{
        text: string;
        value: string;
    }>;
    column: ColumnComponent;
    filter: CompositeFilterDescriptor;
    input: FilterInputDirective;
    readonly currentFilter: FilterDescriptor;
    currentOperator: string;
    defaultOperator: string;
    private filterInputDisabled;
    private _defaultOperator;
    private _operator;
    private changeSubscription;
    constructor(filterService: FilterService);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    onChange(value: any): void;
    onClear(): void;
    protected applyNoValueFilter(operator: string): void;
    protected abstract filterChange(filter: CompositeFilterDescriptor): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
}
