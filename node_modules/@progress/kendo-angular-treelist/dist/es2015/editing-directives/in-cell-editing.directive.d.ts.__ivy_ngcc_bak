/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FormGroup } from '@angular/forms';
import { EditingDirectiveBase } from './editing-directive-base';
import { TreeListComponent } from '../treelist.component';
import { CreateFormGroupArgs } from './create-form-group-args.interface';
/**
 * A directive which encapsulates the editing operations of the TreeList when using the in-cell
 * editing with Reactive Forms ([see example]({% slug editing_directives_treelist %}#toc-the-incell-directive)).
 */
export declare class InCellEditingDirective extends EditingDirectiveBase {
    protected treelist: TreeListComponent;
    /**
     * The function that creates the `FormGroup` for the edited model.
     */
    createFormGroup: (args: CreateFormGroupArgs) => FormGroup;
    constructor(treelist: TreeListComponent);
    protected createModel(args: any): any;
    protected saveModel({ dataItem, formGroup, isNew }: any): any;
    /**
     * @hidden
     */
    ngOnInit(): void;
    protected removeHandler(args: any): void;
    protected cellClickHandler(args: any): void;
    protected cellCloseHandler(args: any): void;
}
