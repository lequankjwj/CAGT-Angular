/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { RowEditingDirectiveBase } from './row-editing-directive-base';
import { GridComponent } from '../grid.component';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
/**
 * A directive which encapsulates the editing operations of the Grid when using
 * the Template-Driven Angular Forms ([see example]({% slug editing_directives_grid %}#toc-the-template-directive)).
 */
export declare class TemplateEditingDirective extends RowEditingDirectiveBase {
    protected grid: GridComponent;
    protected localDataChangesService: LocalDataChangesService;
    /**
     * The function that creates the `dataItem` for the new rows.
     */
    createNewItem: () => any;
    protected dataItem: any;
    protected originalValues: any;
    constructor(grid: GridComponent, localDataChangesService: LocalDataChangesService);
    protected editHandler(args: any): void;
    protected closeEditor(rowIndex: number): void;
    protected createModel(args: any): any;
    protected saveModel(args: any): any;
    protected clean(): void;
}
