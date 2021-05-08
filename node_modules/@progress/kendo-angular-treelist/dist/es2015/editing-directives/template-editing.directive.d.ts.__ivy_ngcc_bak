/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { RowEditingDirectiveBase } from './row-editing-directive-base';
import { TreeListComponent } from '../treelist.component';
/**
 * A directive which encapsulates the editing operations of the TreeList when using
 * the Template-Driven Angular Forms ([see example]({% slug editing_directives_treelist %}#toc-the-template-directive)).
 */
export declare class TemplateEditingDirective extends RowEditingDirectiveBase {
    protected treelist: TreeListComponent;
    /**
     * The function that creates the `dataItem` for the new rows.
     */
    createNewItem: () => any;
    protected dataItem: any;
    protected originalValues: any;
    constructor(treelist: TreeListComponent);
    protected editHandler(args: any): void;
    protected closeEditor(args?: any): void;
    protected createModel(args: any): any;
    protected saveModel(args: any): any;
}
