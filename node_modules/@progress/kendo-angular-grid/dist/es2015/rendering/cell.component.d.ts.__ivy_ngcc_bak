/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DoCheck } from '@angular/core';
import { EditService } from '../editing/edit.service';
import { ColumnBase } from '../columns/column-base';
import { FormGroup } from '@angular/forms';
import { CellContext } from './common/cell-context';
import { IdService } from '../common/id.service';
/**
 * @hidden
 */
export declare class CellComponent implements DoCheck {
    private editService;
    private idService;
    private cellContext;
    readonly commandCellClass: boolean;
    column: any;
    columnIndex: number;
    isNew: boolean;
    rowIndex: number;
    dataItem: any;
    readonly isEdited: boolean;
    readonly formGroup: FormGroup;
    readonly templateContext: any;
    readonly editTemplateContext: any;
    readonly format: any;
    readonly isBoundColumn: boolean;
    readonly isCheckboxColumn: boolean;
    readonly selectionCheckboxId: string;
    readonly isSpanColumn: boolean;
    readonly childColumns: ColumnBase[];
    private _rowIndex;
    private readonly isColumnEditable;
    private _templateContext;
    private _editTemplateContext;
    constructor(editService: EditService, idService: IdService, cellContext: CellContext);
    ngDoCheck(): void;
    ngOnChanges(_changes: any): void;
    private isCommand;
    private isFieldEditable;
    private updateCellContext;
    private updateTemplateContext;
}
