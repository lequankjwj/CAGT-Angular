/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { DetailTemplateDirective } from '../details/detail-template.directive';
import { columnsToRender } from '../../columns/column-common';
/**
 * @hidden
 */
export class ColGroupComponent {
    constructor() {
        this.columns = [];
        this.groups = [];
    }
    get columnsToRender() {
        return columnsToRender(this.columns);
    }
    trackBy(index, _item) {
        return index;
    }
}
ColGroupComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridColGroup]',
                template: `
    <ng-template [ngIf]="true">
        <col [class.k-group-col]="true" *ngFor="let g of groups" />
        <col [class.k-hierarchy-col]="true" *ngIf="detailTemplate?.templateRef"/>
        <col *ngFor="let column of columnsToRender; trackBy: trackBy;" [style.width.px]="column.width"/>
    </ng-template>
    `
            },] },
];
ColGroupComponent.propDecorators = {
    columns: [{ type: Input }],
    groups: [{ type: Input }],
    detailTemplate: [{ type: Input }]
};
