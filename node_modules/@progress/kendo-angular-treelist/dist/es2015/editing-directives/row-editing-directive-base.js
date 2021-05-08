/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EditingDirectiveBase } from './editing-directive-base';
/**
 * @hidden
 */
export class RowEditingDirectiveBase extends EditingDirectiveBase {
    /**
     * @hidden
     */
    ngOnInit() {
        super.ngOnInit();
        this.subscriptions
            .add(this.treelist.edit.subscribe(this.editHandler.bind(this)));
    }
    addHandler(args) {
        this.closeEditor();
        super.addHandler(args);
    }
    editHandler(args) {
        this.closeEditor();
        this.dataItem = args.dataItem;
        this.treelist.editRow(args.dataItem, this.createModel(args));
    }
    saveHandler(args) {
        super.saveHandler(args);
        this.clean();
    }
}
