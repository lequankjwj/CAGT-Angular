/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var dialog_actions_component_1 = require("./dialog/dialog-actions.component");
var localized_messages_directive_1 = require("./localization/localized-messages.directive");
var custom_messages_component_1 = require("./localization/custom-messages.component");
/**
 * @hidden
 */
exports.SHARED_DIRECTIVES = [
    dialog_actions_component_1.DialogActionsComponent,
    custom_messages_component_1.CustomMessagesComponent,
    localized_messages_directive_1.LocalizedMessagesDirective
];
/**
 * @hidden
 */
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [exports.SHARED_DIRECTIVES],
                    exports: [exports.SHARED_DIRECTIVES, common_1.CommonModule],
                    imports: [common_1.CommonModule]
                },] },
    ];
    return SharedModule;
}());
exports.SharedModule = SharedModule;
