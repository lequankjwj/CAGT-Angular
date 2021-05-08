/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { StringFilterMenuComponent } from './string-filter-menu.component';
import { NumericFilterMenuComponent } from './numeric-filter-menu.component';
import { DateFilterMenuComponent } from './date-filter-menu.component';
import { BooleanFilterMenuComponent } from './boolean-filter-menu.component';
/**
 * @hidden
 *
 * > List the following components as `entryComponents` in the GridModule.
 */
export var filterMenuComponentFactory = function (type) { return ({
    "boolean": BooleanFilterMenuComponent,
    "date": DateFilterMenuComponent,
    "numeric": NumericFilterMenuComponent,
    "text": StringFilterMenuComponent
}[type]); };
