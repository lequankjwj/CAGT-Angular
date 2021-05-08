/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var kendo_angular_progressbar_1 = require("@progress/kendo-angular-progressbar");
var stepper_component_1 = require("./stepper/stepper.component");
var step_component_1 = require("./stepper/step.component");
var list_component_1 = require("./stepper/list.component");
var indicator_template_directive_1 = require("./stepper/template-directives/indicator-template.directive");
var label_template_directive_1 = require("./stepper/template-directives/label-template.directive");
var step_template_directive_1 = require("./stepper/template-directives/step-template.directive");
var localized_messages_directive_1 = require("./localization/localized-messages.directive");
var custom_messages_component_1 = require("./localization/custom-messages.component");
var templateDirectives = [
    step_template_directive_1.StepperStepTemplateDirective,
    label_template_directive_1.StepperLabelTemplateDirective,
    indicator_template_directive_1.StepperIndicatorTemplateDirective
];
var exportedModules = [
    stepper_component_1.StepperComponent,
    custom_messages_component_1.CustomMessagesComponent
].concat(templateDirectives);
var declarations = [
    step_component_1.StepperStepComponent,
    list_component_1.StepperListComponent,
    localized_messages_directive_1.LocalizedMessagesDirective
].concat(exportedModules);
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Stepper component.
 */
var StepperModule = /** @class */ (function () {
    function StepperModule() {
    }
    StepperModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [declarations],
                    exports: [exportedModules],
                    imports: [common_1.CommonModule, kendo_angular_progressbar_1.ProgressBarModule]
                },] },
    ];
    return StepperModule;
}());
exports.StepperModule = StepperModule;
