/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommandColumnComponent } from '../columns/command-column.component';
import { CellTemplateDirective } from './cell-template.directive';
import { NoRecordsTemplateDirective } from './no-records-template.directive';
import { EditTemplateDirective } from '../editing/edit-template.directive';
import { TableBodyComponent } from './table-body.component';
import { CellComponent } from './cell.component';
import { BaseCommandDirective } from '../editing/base-command.directive';
import { EditCommandDirective } from '../editing/edit-command.directive';
import { CancelCommandDirective } from '../editing/cancel-command.directive';
import { SaveCommandDirective } from '../editing/save-command.directive';
import { RemoveCommandDirective } from '../editing/remove-command.directive';
import { AddCommandDirective } from '../editing/add-command.directive';
import { SharedModule } from "../shared.module";
import { NumericTextBoxModule } from "@progress/kendo-angular-inputs";
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { LevelItemsPipe } from './common/level-items.pipe';
import { FooterTemplateDirective } from './footer-template.directive';
var exported = [
    CommandColumnComponent,
    CellTemplateDirective,
    EditTemplateDirective,
    TableBodyComponent,
    NoRecordsTemplateDirective,
    CellComponent,
    BaseCommandDirective,
    EditCommandDirective,
    CancelCommandDirective,
    SaveCommandDirective,
    RemoveCommandDirective,
    AddCommandDirective,
    LevelItemsPipe,
    FooterTemplateDirective
];
var importedModules = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NumericTextBoxModule,
    DatePickerModule
];
/**
 * @hidden
 */
var BodyModule = /** @class */ (function () {
    function BodyModule() {
    }
    BodyModule.exports = function () {
        return [
            CommandColumnComponent,
            CellTemplateDirective,
            NoRecordsTemplateDirective,
            EditTemplateDirective,
            EditCommandDirective,
            CancelCommandDirective,
            SaveCommandDirective,
            RemoveCommandDirective,
            AddCommandDirective,
            FooterTemplateDirective
        ];
    };
    BodyModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [exported],
                    exports: [exported],
                    imports: importedModules.slice()
                },] },
    ];
    return BodyModule;
}());
export { BodyModule };
