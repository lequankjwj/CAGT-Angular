/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ChangeDetectorRef } from '@angular/core';
import { GridComponent } from '../grid.component';
import { Selection } from "./selection-default";
/**
 * A directive which stores the row selection state of the Grid in memory
 * ([see example]({% slug selection_grid %}#toc-during-data-operations)).
 */
export class SelectionDirective extends Selection {
    constructor(grid, cd) {
        super(grid, cd);
        this.grid = grid;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        if (this.grid.selectable === false) {
            this.grid.selectable = true;
        }
        this.grid.selectionDirective = this;
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        super.destroy();
    }
}
SelectionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridSelectBy]'
            },] },
];
/** @nocollapse */
SelectionDirective.ctorParameters = () => [
    { type: GridComponent },
    { type: ChangeDetectorRef }
];
