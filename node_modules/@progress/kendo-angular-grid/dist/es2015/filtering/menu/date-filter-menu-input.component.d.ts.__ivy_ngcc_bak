/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnDestroy } from '@angular/core';
import { FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from '../filter.service';
import { SinglePopupService } from '../../common/single-popup.service';
import { DatePickerComponent } from '@progress/kendo-angular-dateinputs';
import { CalendarView, DateInputFormatPlaceholder } from '@progress/kendo-angular-dateinputs';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare class DateFilterMenuInputComponent implements OnDestroy {
    private popupService;
    private localizationService;
    operators: Array<{
        text: string;
        value: string;
    }>;
    column: ColumnComponent;
    filter: CompositeFilterDescriptor;
    operator: string;
    currentFilter: FilterDescriptor;
    filterService: FilterService;
    format: string;
    formatPlaceholder: DateInputFormatPlaceholder;
    placeholder: string;
    min: Date;
    max: Date;
    activeView: CalendarView;
    bottomView: CalendarView;
    topView: CalendarView;
    weekNumber: boolean;
    private subscription;
    constructor(popupService: SinglePopupService, localizationService: LocalizationService);
    ngOnDestroy(): void;
    open(picker: DatePickerComponent): void;
    messageFor(key: string): string;
}
