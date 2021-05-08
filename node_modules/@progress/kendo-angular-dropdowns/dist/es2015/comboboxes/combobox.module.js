/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { touchEnabled } from '@progress/kendo-common';
import { ComboBoxComponent } from './combobox.component';
import { SharedModule } from '../common/shared.module';
import { SharedDirectivesModule } from '../common/shared-directives.module';
import { TOUCH_ENABLED } from '../common/constants/touch-enabled';
const COMBOBOX_DIRECTIVES = [
    ComboBoxComponent
];
const ɵ0 = touchEnabled;
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `ComboBoxComponent`&mdash;The ComboBox component class.
 * - `ItemTemplateDirective`&mdash;The item template directive.
 * - `HeaderTemplateDirective`&mdash;The header template directive.
 * - `FooterTemplateDirective`&mdash;The footer template directive.
 */
export class ComboBoxModule {
}
ComboBoxModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMBOBOX_DIRECTIVES],
                exports: [COMBOBOX_DIRECTIVES, SharedDirectivesModule],
                imports: [SharedModule],
                providers: [{ provide: TOUCH_ENABLED, useValue: ɵ0 }]
            },] },
];
export { ɵ0 };
