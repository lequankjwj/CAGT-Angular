/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { BooleanFilterComponent } from '../boolean-filter.component';
/**
 * Represents a Boolean-filter menu component.
 *
 * @example
 *  ```html-no-run
 *      <kendo-treelist-column field="Discontinued" title="Discontinued">
 *          <ng-template kendoTreeListFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *            <kendo-treelist-boolean-filter-menu
 *                [column]="column"
 *                [filter]="filter"
 *                [filterService]="filterService"
 *                >
 *            </kendo-treelist-boolean-filter-menu>
 *          </ng-template>
 *      </kendo-treelist-column>
 *   ```
 */
export declare class BooleanFilterMenuComponent extends BooleanFilterComponent {
    /**
     * @hidden
     */
    readonly hostClasses: boolean;
    /**
     * The current menu filter.
     * @type {CompositeFilterDescriptor}
     */
    filter: CompositeFilterDescriptor;
    /**
     * The `FilterService` instance which is responsible for handling the changes in the filter descriptor.
     */
    filterService: FilterService;
    idPrefix: string;
    constructor(localization: LocalizationService);
    /**
     * @hidden
     */
    radioId(value: any): string;
    /**
     * @hidden
     */
    onChange(value: any): void;
    /**
     * @hidden
     */
    isSelected(radioValue: any): boolean;
}
