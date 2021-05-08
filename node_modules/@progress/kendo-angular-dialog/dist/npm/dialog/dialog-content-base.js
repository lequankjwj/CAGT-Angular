/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialog_actions_component_1 = require("./dialog-actions.component");
var dialog_titlebar_component_1 = require("./dialog-titlebar.component");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
/**
 * The base class  which will be extended by a component that is provided as content through `content`
 * ([see example]({% slug service_dialog %}#toc-passing-title-content-and-actions-as-a-single-component)).
 */
var DialogContentBase = /** @class */ (function () {
    function DialogContentBase(dialog) {
        this.dialog = dialog;
    }
    /**
     * @hidden
     */
    DialogContentBase.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.dialogTitleBar) {
            // when opening component inside dialog with service AND the component has defined its own titlebar
            this.dialogTitleBar.close.pipe(operators_1.filter(function (e) { return !e.isDefaultPrevented(); })).subscribe(function () {
                _this.dialog.close();
            });
        }
        if (this.dialogActions) {
            if (this.dialogActions.actions) {
                this.dialogActions.action.subscribe(function (action) { return _this.dialog.dialog.instance.action.emit(action); });
            }
        }
    };
    DialogContentBase.propDecorators = {
        dialogTitleBar: [{ type: core_1.ViewChild, args: [dialog_titlebar_component_1.DialogTitleBarComponent,] }],
        dialogActions: [{ type: core_1.ViewChild, args: [dialog_actions_component_1.DialogActionsComponent,] }]
    };
    return DialogContentBase;
}());
exports.DialogContentBase = DialogContentBase;
