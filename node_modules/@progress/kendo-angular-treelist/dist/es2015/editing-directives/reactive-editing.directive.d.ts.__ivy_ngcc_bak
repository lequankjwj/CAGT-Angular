/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FormGroup } from '@angular/forms';
import { RowEditingDirectiveBase } from './row-editing-directive-base';
import { TreeListComponent } from '../treelist.component';
import { CreateFormGroupArgs } from './create-form-group-args.interface';
/**
 * A directive which encapsulates the editing operations of the TreeList when using the
 * Reactive Forms ([see example]({% slug editing_directives_treelist %}#toc-the-reactive-directive)).
 */
export declare class ReactiveEditingDirective extends RowEditingDirectiveBase {
    protected treelist: TreeListComponent;
    /**
     * The function that creates the `FormGroup` for the edited model.
     */
    createFormGroup: (args: CreateFormGroupArgs) => FormGroup;
    constructor(treelist: TreeListComponent);
    protected createModel(args: any): any;
    protected saveModel({ dataItem, formGroup, isNew }: any): any;
}
