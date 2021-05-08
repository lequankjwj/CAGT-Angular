/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogActionsComponent } from './dialog/dialog-actions.component';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { CustomMessagesComponent } from './localization/custom-messages.component';
/**
 * @hidden
 */
export const SHARED_DIRECTIVES = [
    DialogActionsComponent,
    CustomMessagesComponent,
    LocalizedMessagesDirective
];
/**
 * @hidden
 */
export class SharedModule {
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SHARED_DIRECTIVES],
                exports: [SHARED_DIRECTIVES, CommonModule],
                imports: [CommonModule]
            },] },
];
