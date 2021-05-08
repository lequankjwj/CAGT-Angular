/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var column_component_1 = require("../../columns/column.component");
var filter_service_1 = require("../filter.service");
/**
 * @hidden
 */
var StringFilterMenuInputComponent = /** @class */ (function () {
    function StringFilterMenuInputComponent() {
        this.operators = [];
    }
    StringFilterMenuInputComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-treelist-string-filter-menu-input',
                    template: "\n        <kendo-treelist-filter-menu-input-wrapper\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [currentFilter]=\"currentFilter\"\n            [filterService]=\"filterService\"\n            >\n            <input class=\"k-textbox\" kendoFilterInput [filterDelay]=\"0\" [ngModel]=\"currentFilter?.value\" />\n        </kendo-treelist-filter-menu-input-wrapper>\n    "
                },] },
    ];
    StringFilterMenuInputComponent.propDecorators = {
        operators: [{ type: core_1.Input }],
        column: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        operator: [{ type: core_1.Input }],
        currentFilter: [{ type: core_1.Input }],
        filterService: [{ type: core_1.Input }]
    };
    return StringFilterMenuInputComponent;
}());
exports.StringFilterMenuInputComponent = StringFilterMenuInputComponent;
