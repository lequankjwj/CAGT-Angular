/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var detail_template_directive_1 = require("../details/detail-template.directive");
var column_common_1 = require("../../columns/column-common");
var utils_1 = require("../../utils");
/**
 * @hidden
 */
var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        this.columns = [];
        this.groups = [];
        this.lockedColumnsCount = 0;
        this.logicalRowIndex = 0;
    }
    Object.defineProperty(FooterComponent.prototype, "footerClass", {
        get: function () {
            return !this.scrollable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FooterComponent.prototype, "columnsToRender", {
        get: function () {
            return column_common_1.columnsToRender(this.columns || []);
        },
        enumerable: true,
        configurable: true
    });
    FooterComponent.prototype.logicalColumnIndex = function (column) {
        var index = column.leafIndex;
        if (utils_1.isPresent(index)) {
            return index + (utils_1.isPresent(this.detailTemplate) ? 1 : 0);
        }
        return -1;
    };
    FooterComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[kendoGridFooter]',
                    template: "\n    <ng-template [ngIf]=\"true\">\n        <tr\n            [class.k-footer-template]=\"true\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"logicalRowIndex\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"columns.length - lockedColumnsCount\"\n            >\n            <td\n                [class.k-group-cell]=\"true\"\n                role=\"presentation\"\n                *ngFor=\"let g of groups\">\n            </td>\n            <td\n                [class.k-hierarchy-cell]=\"true\"\n                role=\"presentation\"\n                *ngIf=\"detailTemplate?.templateRef\">\n            </td>\n            <td\n                *ngFor=\"let column of columnsToRender; let columnIndex = index\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex\"\n                    [logicalColIndex]=\"logicalColumnIndex(column)\"\n                    role=\"columnfooter\"\n                    aria-selected=\"false\"\n                [ngClass]=\"column.footerClass\"\n                [ngStyle]=\"column.footerStyle\">\n                <ng-template\n                    [templateContext]=\"{\n                        templateRef: column.footerTemplateRef,\n                        columnIndex: lockedColumnsCount + columnIndex,\n                        column: column,\n                        $implicit: column\n                    }\">\n                </ng-template>\n            </td>\n        </tr>\n    </ng-template>\n    "
                },] },
    ];
    FooterComponent.propDecorators = {
        columns: [{ type: core_1.Input }],
        groups: [{ type: core_1.Input }],
        detailTemplate: [{ type: core_1.Input }],
        scrollable: [{ type: core_1.Input }],
        lockedColumnsCount: [{ type: core_1.Input }],
        logicalRowIndex: [{ type: core_1.Input }],
        footerClass: [{ type: core_1.HostBinding, args: ['class.k-grid-footer',] }]
    };
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
