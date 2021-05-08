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
export class FooterComponent {
    constructor() {
        this.columns = [];
        this.groups = [];
        this.lockedColumnsCount = 0;
        this.logicalRowIndex = 0;
    }
    get footerClass() {
        return !this.scrollable;
    }
    get columnsToRender() {
        return columnsToRender(this.columns || []);
    }
    logicalColumnIndex(column) {
        const index = column.leafIndex;
        if (isPresent(index)) {
            return index + (isPresent(this.detailTemplate) ? 1 : 0);
        }
        return -1;
    }
}
FooterComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridFooter]',
                template: `
    <ng-template [ngIf]="true">
        <tr
            [class.k-footer-template]="true"
            kendoGridLogicalRow
                [logicalRowIndex]="logicalRowIndex"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="columns.length - lockedColumnsCount"
            >
            <td
                [class.k-group-cell]="true"
                role="presentation"
                *ngFor="let g of groups">
            </td>
            <td
                [class.k-hierarchy-cell]="true"
                role="presentation"
                *ngIf="detailTemplate?.templateRef">
            </td>
            <td
                *ngFor="let column of columnsToRender; let columnIndex = index"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex"
                    [logicalColIndex]="logicalColumnIndex(column)"
                    role="columnfooter"
                    aria-selected="false"
                [ngClass]="column.footerClass"
                [ngStyle]="column.footerStyle">
                <ng-template
                    [templateContext]="{
                        templateRef: column.footerTemplateRef,
                        columnIndex: lockedColumnsCount + columnIndex,
                        column: column,
                        $implicit: column
                    }">
                </ng-template>
            </td>
        </tr>
    </ng-template>
    `
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
