/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EditingDirectiveBase } from './editing-directive-base';
import { LocalRowEditService } from './local-row-edit.service';
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
            .add(this.grid.edit.subscribe(this.editHandler.bind(this)));
    }
    createDefaultService() {
        return new LocalRowEditService(this.grid, this.localDataChangesService);
    }
    addHandler() {
        this.closeEditor();
        super.addHandler();
    }
    editHandler(args) {
        this.closeEditor();
        this.rowIndex = args.rowIndex;
        this.grid.editRow(args.rowIndex, this.createModel(args));
    }
    saveHandler(args) {
        super.saveHandler(args);
        this.clean();
    }
    closeEditor(rowIndex = this.rowIndex) {
        super.closeEditor(rowIndex);
        this.clean();
    }
    clean() {
        delete this.rowIndex;
    }
}
