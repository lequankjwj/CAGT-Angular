/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var draggable_column_directive_1 = require("./draggable-column.directive");
var drop_target_directive_1 = require("./drop-target.directive");
var exported = [
    draggable_column_directive_1.DraggableColumnDirective,
    drop_target_directive_1.DropTargetDirective
];
/**
 * @hidden
 */
var DragAndDropModule = /** @class */ (function () {
    function DragAndDropModule() {
    }
    DragAndDropModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [exported],
                    exports: [exported]
                },] },
    ];
    return DragAndDropModule;
}());
exports.DragAndDropModule = DragAndDropModule;
