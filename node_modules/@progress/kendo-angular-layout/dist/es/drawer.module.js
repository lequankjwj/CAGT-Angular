/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerContainerComponent } from './drawer/drawer-container.component';
import { DrawerComponent } from './drawer/drawer.component';
import { DrawerContentComponent } from './drawer/drawer-content.component';
import { DrawerItemComponent } from './drawer/item.component';
import { DrawerListComponent } from './drawer/list.component';
import { DrawerTemplateDirective, DrawerItemTemplateDirective, DrawerHeaderTemplateDirective, DrawerFooterTemplateDirective } from './drawer/template-directives';
var templateDirectives = [
    DrawerTemplateDirective,
    DrawerHeaderTemplateDirective,
    DrawerFooterTemplateDirective,
    DrawerItemTemplateDirective
];
var exportedModules = [
    DrawerComponent,
    DrawerContainerComponent,
    DrawerContentComponent
].concat(templateDirectives);
var declarations = [
    DrawerItemComponent,
    DrawerListComponent
].concat(exportedModules);
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Drawer component.
 */
var DrawerModule = /** @class */ (function () {
    function DrawerModule() {
    }
    DrawerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [declarations],
                    exports: [exportedModules],
                    imports: [CommonModule]
                },] },
    ];
    return DrawerModule;
}());
export { DrawerModule };
