/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input } from '@angular/core';
import { TreeListComponent } from "../../treelist.component";
/**
 * @hidden
 */
export class ToolbarComponent {
    constructor(treelist) {
        this.treelist = treelist;
        this.context = {};
    }
    get classNames() {
        return 'k-header k-grid-toolbar';
    }
    set position(value) {
        this.context.position = value;
    }
    get toolbarTemplateRef() {
        return this.treelist.toolbarTemplate ? this.treelist.toolbarTemplate.templateRef : undefined;
    }
}
ToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-toolbar',
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
    { type: TreeListComponent }
];
ToolbarComponent.propDecorators = {
    classNames: [{ type: HostBinding, args: ['class',] }],
    position: [{ type: Input }]
};
