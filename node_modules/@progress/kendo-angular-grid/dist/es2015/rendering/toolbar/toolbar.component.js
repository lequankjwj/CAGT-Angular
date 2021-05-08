/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input } from '@angular/core';
import { GridComponent } from "../../grid.component";
/**
 * @hidden
 */
export class ToolbarComponent {
    constructor(grid) {
        this.grid = grid;
        this.context = {};
    }
    get classNames() {
        return 'k-header k-grid-toolbar';
    }
    set position(value) {
        this.context.position = value;
    }
    get toolbarTemplateRef() {
        return this.grid.toolbarTemplate ? this.grid.toolbarTemplate.templateRef : undefined;
    }
}
ToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-toolbar',
                template: `
        <ng-template
            *ngIf="toolbarTemplateRef"
            [ngTemplateOutlet]="toolbarTemplateRef"
            [ngTemplateOutletContext]="context"
            >
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolbarComponent.ctorParameters = () => [
    { type: GridComponent }
];
ToolbarComponent.propDecorators = {
    classNames: [{ type: HostBinding, args: ['class',] }],
    position: [{ type: Input }]
};
