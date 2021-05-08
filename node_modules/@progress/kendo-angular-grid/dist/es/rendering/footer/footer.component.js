/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding } from '@angular/core';
import { DetailTemplateDirective } from '../details/detail-template.directive';
import { columnsToRender } from '../../columns/column-common';
import { isPresent } from '../../utils';
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
            return columnsToRender(this.columns || []);
        },
        enumerable: true,
        configurable: true
    });
    FooterComponent.prototype.logicalColumnIndex = function (column) {
        var index = column.leafIndex;
        if (isPresent(index)) {
            return index + (isPresent(this.detailTemplate) ? 1 : 0);
        }
        return -1;
    };
    FooterComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoGridFooter]',
                    template: "\n    <ng-template [ngIf]=\"true\">\n        <tr\n            [class.k-footer-template]=\"true\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"logicalRowIndex\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"columns.length - lockedColumnsCount\"\n            >\n            <td\n                [class.k-group-cell]=\"true\"\n                role=\"presentation\"\n                *ngFor=\"let g of groups\">\n            </td>\n            <td\n                [class.k-hierarchy-cell]=\"true\"\n                role=\"presentation\"\n                *ngIf=\"detailTemplate?.templateRef\">\n            </td>\n            <td\n                *ngFor=\"let column of columnsToRender; let columnIndex = index\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex\"\n                    [logicalColIndex]=\"logicalColumnIndex(column)\"\n                    role=\"columnfooter\"\n                    aria-selected=\"false\"\n                [ngClass]=\"column.footerClass\"\n                [ngStyle]=\"column.footerStyle\">\n                <ng-template\n                    [templateContext]=\"{\n                        templateRef: column.footerTemplateRef,\n                        columnIndex: lockedColumnsCount + columnIndex,\n                        column: column,\n                        $implicit: column\n                    }\">\n                </ng-template>\n            </td>\n        </tr>\n    </ng-template>\n    "
                },] },
    ];
    FooterComponent.propDecorators = {
        columns: [{ type: Input }],
        groups: [{ type: Input }],
        detailTemplate: [{ type: Input }],
        scrollable: [{ type: Input }],
        lockedColumnsCount: [{ type: Input }],
        logicalRowIndex: [{ type: Input }],
        footerClass: [{ type: HostBinding, args: ['class.k-grid-footer',] }]
    };
    return FooterComponent;
}());
export { FooterComponent };
