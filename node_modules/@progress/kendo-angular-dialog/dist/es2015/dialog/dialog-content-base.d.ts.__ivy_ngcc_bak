/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DialogRef } from './dialog-settings';
import { DialogActionsComponent } from './dialog-actions.component';
import { DialogTitleBarComponent } from './dialog-titlebar.component';
/**
 * The base class  which will be extended by a component that is provided as content through `content`
 * ([see example]({% slug service_dialog %}#toc-passing-title-content-and-actions-as-a-single-component)).
 */
export declare class DialogContentBase {
    dialog: DialogRef;
    /**
     * @hidden
     */
    dialogTitleBar: DialogTitleBarComponent;
    /**
     * @hidden
     */
    dialogActions: DialogActionsComponent;
    constructor(dialog: DialogRef);
    /**
     * @hidden
     */
    ngAfterViewInit(): void;
}
