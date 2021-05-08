/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostBinding, Input } from '@angular/core';
import { IdService } from '../common/id.service';
import { NavigationService } from './navigation.service';
import { anyChanged } from '@progress/kendo-angular-common';
let id = 0;
function nextId() {
    return id++;
}
/**
 * @hidden
 */
export class LogicalRowDirective {
    constructor(idService, navigation) {
        this.idService = idService;
        this.navigation = navigation;
        this.logicalSlaveRow = false;
        this.logicalSlaveCellsCount = 0;
        this.dataRowIndex = -1;
        this.uid = nextId();
    }
    get hostRole() {
        return this.logicalSlaveRow ? 'presentation' : 'row';
    }
    get ariaRowIndex() {
        if (this.navigation.enabled) {
            return this.logicalRowIndex + 1;
        }
    }
    get ariaOwns() {
        if (!this.navigation.enabled || this.logicalSlaveRow || this.logicalSlaveCellsCount === 0) {
            return undefined;
        }
        const ids = [];
        const total = this.logicalCellsCount + this.logicalSlaveCellsCount;
        for (let cellIndex = this.logicalCellsCount; cellIndex < total; cellIndex++) {
            ids.push(this.idService.cellId(this.logicalRowIndex, cellIndex));
        }
        return ids.join(' ');
    }
    ngOnChanges(changes) {
        if (!this.navigation.enabled || this.logicalSlaveRow) {
            return;
        }
        const indexChange = changes.logicalRowIndex;
        const logicalSlaveRowChange = changes.logicalSlaveRow;
        if (indexChange || logicalSlaveRowChange) {
            const index = indexChange && !indexChange.isFirstChange() ? indexChange.previousValue : this.logicalRowIndex;
            this.navigation.unregisterRow(index, this);
            this.navigation.registerRow(this);
        }
        else if (anyChanged(['dataRowIndex', 'dataItem'], changes)) {
            this.navigation.updateRow(this);
        }
    }
    ngOnDestroy() {
        this.navigation.unregisterRow(this.logicalRowIndex, this);
    }
}
LogicalRowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridLogicalRow]'
            },] },
];
/** @nocollapse */
LogicalRowDirective.ctorParameters = () => [
    { type: IdService },
    { type: NavigationService }
];
LogicalRowDirective.propDecorators = {
    logicalRowIndex: [{ type: Input }],
    logicalSlaveRow: [{ type: Input }],
    logicalCellsCount: [{ type: Input }],
    logicalSlaveCellsCount: [{ type: Input }],
    dataRowIndex: [{ type: Input }],
    dataItem: [{ type: Input }],
    hostRole: [{ type: HostBinding, args: ['attr.role',] }],
    ariaRowIndex: [{ type: HostBinding, args: ['attr.aria-rowindex',] }],
    ariaOwns: [{ type: HostBinding, args: ['attr.aria-owns',] }]
};
