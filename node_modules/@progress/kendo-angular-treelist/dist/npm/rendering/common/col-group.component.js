/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var column_common_1 = require("../../columns/column-common");
/**
 * @hidden
 */
var ColGroupComponent = /** @class */ (function () {
    function ColGroupComponent() {
        this.columns = [];
    }
    Object.defineProperty(ColGroupComponent.prototype, "columnsToRender", {
        get: function () {
            return column_common_1.columnsToRender(this.columns);
        },
        enumerable: true,
        configurable: true
    });
    ColGroupComponent.prototype.trackBy = function (index, _item) {
        return index;
    };
    ColGroupComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[kendoTreeListColGroup]',
                    template: "\n        <col *ngFor=\"let column of columnsToRender; trackBy: trackBy;\" [style.width.px]=\"column.width\"/>\n    "
                },] },
    ];
    ColGroupComponent.propDecorators = {
        columns: [{ type: core_1.Input }]
    };
    return ColGroupComponent;
}());
exports.ColGroupComponent = ColGroupComponent;
