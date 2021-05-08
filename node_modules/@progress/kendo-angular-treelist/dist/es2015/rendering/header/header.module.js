/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SharedModule } from "../../shared.module";
import { RowFilterModule } from '../../filtering/cell/row-filtering.module';
import { HeaderTemplateDirective } from "./header-template.directive";
import { ColumnHandleDirective } from './../../column-resizing/column-handle.directive';
import { FilterMenuModule } from '../../filtering/menu/filter-menu.module';
import { DragAndDropModule } from '../../dragdrop/drag-and-drop.module';
import { ColumnMenuModule } from '../../column-menu/column-menu.module';
const exportedModules = [
    HeaderComponent,
    HeaderTemplateDirective,
    ColumnHandleDirective
];
const importedModules = [
    CommonModule,
    RowFilterModule,
    FilterMenuModule,
    SharedModule,
    DragAndDropModule,
    ColumnMenuModule
];
/**
 * @hidden
 */
export class HeaderModule {
    static exports() {
        return [
            HeaderTemplateDirective
        ];
    }
}
HeaderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [exportedModules],
                exports: [exportedModules],
                imports: [...importedModules]
            },] },
];
