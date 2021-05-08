/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './columns/column.component';
import { SpanColumnComponent } from './columns/span-column.component';
import { ColumnGroupComponent } from './columns/column-group.component';
import { FooterTemplateDirective } from './rendering/footer/footer-template.directive';
import { ColGroupComponent } from './rendering/common/col-group.component';
import { LoadingComponent } from './rendering/common/loading.component';
import { ResizableContainerDirective } from './layout/resizable.directive';
import { TemplateContextDirective } from './rendering/common/template-context.directive';
import { DetailTemplateDirective } from './rendering/details/detail-template.directive';
import { DraggableModule } from '@progress/kendo-angular-common';
import { LogicalCellDirective } from './navigation/logical-cell.directive';
import { LogicalRowDirective } from './navigation/logical-row.directive';
import { FieldAccessorPipe } from "./rendering/common/field-accessor.pipe";
import { TableDirective } from "./column-resizing/table.directive";
import { FocusableDirective } from "./navigation/focusable.directive";
import { EventsModule } from '@progress/kendo-angular-common';
const exportedModules = [
    ColumnComponent,
    ColumnGroupComponent,
    LogicalCellDirective,
    LogicalRowDirective,
    FocusableDirective,
    FooterTemplateDirective,
    ColGroupComponent,
    ResizableContainerDirective,
    TemplateContextDirective,
    FieldAccessorPipe,
    DetailTemplateDirective,
    SpanColumnComponent,
    TableDirective,
    LoadingComponent
];
/**
 * @hidden
 */
export class SharedModule {
    static exports() {
        return [
            ColumnComponent,
            SpanColumnComponent,
            ColumnGroupComponent,
            FooterTemplateDirective,
            DetailTemplateDirective,
            FocusableDirective
        ];
    }
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: [exportedModules],
                exports: [exportedModules, DraggableModule, EventsModule],
                imports: [CommonModule]
            },] },
];
