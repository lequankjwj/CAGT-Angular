/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { StepperComponent } from './stepper/stepper.component';
import { StepperStepComponent } from './stepper/step.component';
import { StepperListComponent } from './stepper/list.component';
import { StepperIndicatorTemplateDirective } from './stepper/template-directives/indicator-template.directive';
import { StepperLabelTemplateDirective } from './stepper/template-directives/label-template.directive';
import { StepperStepTemplateDirective } from './stepper/template-directives/step-template.directive';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { CustomMessagesComponent } from './localization/custom-messages.component';
const templateDirectives = [
    StepperStepTemplateDirective,
    StepperLabelTemplateDirective,
    StepperIndicatorTemplateDirective
];
const exportedModules = [
    StepperComponent,
    CustomMessagesComponent,
    ...templateDirectives
];
const declarations = [
    StepperStepComponent,
    StepperListComponent,
    LocalizedMessagesDirective,
    ...exportedModules
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Stepper component.
 */
export class StepperModule {
}
StepperModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations],
                exports: [exportedModules],
                imports: [CommonModule, ProgressBarModule]
            },] },
];
