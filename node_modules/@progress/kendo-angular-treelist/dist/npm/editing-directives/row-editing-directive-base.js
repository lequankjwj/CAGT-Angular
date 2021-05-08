/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var editing_directive_base_1 = require("./editing-directive-base");
/**
 * @hidden
 */
var RowEditingDirectiveBase = /** @class */ (function (_super) {
    tslib_1.__extends(RowEditingDirectiveBase, _super);
    function RowEditingDirectiveBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @hidden
     */
    RowEditingDirectiveBase.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.subscriptions
            .add(this.treelist.edit.subscribe(this.editHandler.bind(this)));
    };
    RowEditingDirectiveBase.prototype.addHandler = function (args) {
        this.closeEditor();
        _super.prototype.addHandler.call(this, args);
    };
    RowEditingDirectiveBase.prototype.editHandler = function (args) {
        this.closeEditor();
        this.dataItem = args.dataItem;
        this.treelist.editRow(args.dataItem, this.createModel(args));
    };
    RowEditingDirectiveBase.prototype.saveHandler = function (args) {
        _super.prototype.saveHandler.call(this, args);
        this.clean();
    };
    return RowEditingDirectiveBase;
}(editing_directive_base_1.EditingDirectiveBase));
exports.RowEditingDirectiveBase = RowEditingDirectiveBase;
