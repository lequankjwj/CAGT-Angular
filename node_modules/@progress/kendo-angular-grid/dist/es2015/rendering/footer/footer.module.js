/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared.module";
import { FooterComponent } from "./footer.component";
const exportedModules = [
    FooterComponent
];
const importedModules = [
    CommonModule,
    SharedModule
];
/**
 * @hidden
 */
export class FooterModule {
    static exports() {
        return [];
    }
}
FooterModule.decorators = [
    { type: NgModule, args: [{
                declarations: [exportedModules],
                exports: [exportedModules],
                imports: [...importedModules]
            },] },
];
