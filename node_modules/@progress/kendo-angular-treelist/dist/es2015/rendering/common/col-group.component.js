/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { columnsToRender } from '../../columns/column-common';
/**
 * @hidden
 */
export class ColGroupComponent {
    constructor() {
        this.columns = [];
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
                selector: '[kendoTreeListColGroup]',
                template: `
        <col *ngFor="let column of columnsToRender; trackBy: trackBy;" [style.width.px]="column.width"/>
    `
            },] },
];
ColGroupComponent.propDecorators = {
    columns: [{ type: Input }]
};
