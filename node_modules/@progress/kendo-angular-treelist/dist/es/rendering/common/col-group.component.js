/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { columnsToRender } from '../../columns/column-common';
/**
 * @hidden
 */
var ColGroupComponent = /** @class */ (function () {
    function ColGroupComponent() {
        this.columns = [];
    }
    Object.defineProperty(ColGroupComponent.prototype, "columnsToRender", {
        get: function () {
            return columnsToRender(this.columns);
        },
        enumerable: true,
        configurable: true
    });
    ColGroupComponent.prototype.trackBy = function (index, _item) {
        return index;
    };
    ColGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoTreeListColGroup]',
                    template: "\n        <col *ngFor=\"let column of columnsToRender; trackBy: trackBy;\" [style.width.px]=\"column.width\"/>\n    "
                },] },
    ];
    ColGroupComponent.propDecorators = {
        columns: [{ type: Input }]
    };
    return ColGroupComponent;
}());
export { ColGroupComponent };
