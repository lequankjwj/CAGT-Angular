/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var drawer_container_component_1 = require("./drawer/drawer-container.component");
var drawer_component_1 = require("./drawer/drawer.component");
var drawer_content_component_1 = require("./drawer/drawer-content.component");
var item_component_1 = require("./drawer/item.component");
var list_component_1 = require("./drawer/list.component");
var template_directives_1 = require("./drawer/template-directives");
var templateDirectives = [
    template_directives_1.DrawerTemplateDirective,
    template_directives_1.DrawerHeaderTemplateDirective,
    template_directives_1.DrawerFooterTemplateDirective,
    template_directives_1.DrawerItemTemplateDirective
];
var exportedModules = [
    drawer_component_1.DrawerComponent,
    drawer_container_component_1.DrawerContainerComponent,
    drawer_content_component_1.DrawerContentComponent
].concat(templateDirectives);
var declarations = [
    item_component_1.DrawerItemComponent,
    list_component_1.DrawerListComponent
].concat(exportedModules);
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Drawer component.
 */
var DrawerModule = /** @class */ (function () {
    function DrawerModule() {
    }
    DrawerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [declarations],
                    exports: [exportedModules],
                    imports: [common_1.CommonModule]
                },] },
    ];
    return DrawerModule;
}());
exports.DrawerModule = DrawerModule;
