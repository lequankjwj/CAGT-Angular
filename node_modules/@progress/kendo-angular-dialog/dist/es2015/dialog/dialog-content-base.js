/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DialogActionsComponent } from './dialog-actions.component';
import { DialogTitleBarComponent } from './dialog-titlebar.component';
import { ViewChild } from '@angular/core';
import { filter } from 'rxjs/operators';
/**
 * The base class  which will be extended by a component that is provided as content through `content`
 * ([see example]({% slug service_dialog %}#toc-passing-title-content-and-actions-as-a-single-component)).
 */
export class DialogContentBase {
    constructor(dialog) {
        this.dialog = dialog;
    }
    /**
     * @hidden
     */
    ngAfterViewInit() {
        if (this.dialogTitleBar) {
            // when opening component inside dialog with service AND the component has defined its own titlebar
            this.dialogTitleBar.close.pipe(filter((e) => !e.isDefaultPrevented())).subscribe(() => {
                this.dialog.close();
            });
        }
        if (this.dialogActions) {
            if (this.dialogActions.actions) {
                this.dialogActions.action.subscribe(action => this.dialog.dialog.instance.action.emit(action));
            }
        }
    }
}
DialogContentBase.propDecorators = {
    dialogTitleBar: [{ type: ViewChild, args: [DialogTitleBarComponent,] }],
    dialogActions: [{ type: ViewChild, args: [DialogActionsComponent,] }]
};
