/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_common_1 = require("@progress/kendo-common");
var combobox_component_1 = require("./combobox.component");
var shared_module_1 = require("../common/shared.module");
var shared_directives_module_1 = require("../common/shared-directives.module");
var touch_enabled_1 = require("../common/constants/touch-enabled");
var COMBOBOX_DIRECTIVES = [
    combobox_component_1.ComboBoxComponent
];
var ɵ0 = kendo_common_1.touchEnabled;
exports.ɵ0 = ɵ0;
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
var ComboBoxModule = /** @class */ (function () {
    function ComboBoxModule() {
    }
    ComboBoxModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [COMBOBOX_DIRECTIVES],
                    exports: [COMBOBOX_DIRECTIVES, shared_directives_module_1.SharedDirectivesModule],
                    imports: [shared_module_1.SharedModule],
                    providers: [{ provide: touch_enabled_1.TOUCH_ENABLED, useValue: ɵ0 }]
                },] },
    ];
    return ComboBoxModule;
}());
exports.ComboBoxModule = ComboBoxModule;
