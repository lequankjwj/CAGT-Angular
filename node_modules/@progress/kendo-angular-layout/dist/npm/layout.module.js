/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var avatar_module_1 = require("./avatar.module");
var card_module_1 = require("./card.module");
var drawer_module_1 = require("./drawer.module");
var panelbar_module_1 = require("./panelbar.module");
var splitter_module_1 = require("./splitter.module");
var stepper_module_1 = require("./stepper.module");
var tabstrip_module_1 = require("./tabstrip.module");
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Layout components.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Layout module
 * import { LayoutModule } from '@progress/kendo-angular-layout';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, LayoutModule], // import Layout module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [
                        avatar_module_1.AvatarModule,
                        card_module_1.CardModule,
                        drawer_module_1.DrawerModule,
                        panelbar_module_1.PanelBarModule,
                        splitter_module_1.SplitterModule,
                        stepper_module_1.StepperModule,
                        tabstrip_module_1.TabStripModule
                    ]
                },] },
    ];
    return LayoutModule;
}());
exports.LayoutModule = LayoutModule;
