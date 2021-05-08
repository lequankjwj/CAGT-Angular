/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var excel_component_1 = require("./excel.component");
var excel_command_directive_1 = require("./excel-command.directive");
var kendo_angular_excel_export_1 = require("@progress/kendo-angular-excel-export");
var declarations = [excel_component_1.ExcelComponent, excel_command_directive_1.ExcelCommandDirective];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Excel component of the TreeList.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the TreeList and Excel modules
 * import { TreeListModule, ExcelModule } from '@progress/kendo-angular-treelist';
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
 *     imports:      [BrowserModule, TreeListModule, ExcelModule], // import TreeList and Excel modules
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var ExcelModule = /** @class */ (function () {
    function ExcelModule() {
    }
    ExcelModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [declarations],
                    exports: [declarations, kendo_angular_excel_export_1.ExcelExportModule]
                },] },
    ];
    return ExcelModule;
}());
exports.ExcelModule = ExcelModule;
