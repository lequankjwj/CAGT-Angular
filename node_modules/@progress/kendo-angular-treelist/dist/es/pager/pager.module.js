/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PagerComponent } from './pager.component';
import { PagerPrevButtonsComponent } from './pager-prev-buttons.component';
import { PagerNextButtonsComponent } from './pager-next-buttons.component';
import { PagerNumericButtonsComponent } from './pager-numeric-buttons.component';
import { PagerInputComponent } from './pager-input.component';
import { PagerInfoComponent } from './pager-info.component';
import { PagerPageSizesComponent } from './pager-page-sizes.component';
import { PagerTemplateDirective } from './pager-template.directive';
import { SharedModule } from "../shared.module";
import { EventsModule } from '@progress/kendo-angular-common';
var importedModules = [
    CommonModule,
    InputsModule,
    SharedModule,
    EventsModule
];
var INTERNAL_COMPONENTS = [
    PagerComponent,
    PagerPrevButtonsComponent,
    PagerNextButtonsComponent,
    PagerNumericButtonsComponent,
    PagerInputComponent,
    PagerInfoComponent,
    PagerPageSizesComponent,
    PagerTemplateDirective
];
/**
 * @hidden
 */
var PagerModule = /** @class */ (function () {
    function PagerModule() {
    }
    PagerModule.exports = function () {
        return [
            PagerComponent,
            PagerPrevButtonsComponent,
            PagerNextButtonsComponent,
            PagerNumericButtonsComponent,
            PagerInputComponent,
            PagerInfoComponent,
            PagerPageSizesComponent,
            PagerTemplateDirective
        ];
    };
    PagerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [INTERNAL_COMPONENTS],
                    exports: [INTERNAL_COMPONENTS],
                    imports: importedModules.slice()
                },] },
    ];
    return PagerModule;
}());
export { PagerModule };
