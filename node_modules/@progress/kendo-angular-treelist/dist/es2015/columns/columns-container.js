/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { QueryList, EventEmitter } from '@angular/core';
import { isColumnGroupComponent } from './column-group.component';
import { columnsToRender, someLeafColumn } from './column-common';
const reset = (...lists) => {
    let diff = false;
    for (let idx = 0; idx < lists.length; idx++) {
        const [list, columns] = lists[idx];
        diff = diff || list.length !== columns.length;
        list.reset(columns);
    }
    return diff;
};
const ɵ0 = reset;
/**
 * @hidden
 */
export class ColumnsContainer {
    constructor(columns) {
        this.columns = columns;
        this.allColumns = new QueryList();
        this.leafColumns = new QueryList();
        this.lockedColumns = new QueryList();
        this.nonLockedColumns = new QueryList();
        this.lockedLeafColumns = new QueryList();
        this.nonLockedLeafColumns = new QueryList();
        this.totalLevels = 0;
        this.changes = new EventEmitter();
        this.leafColumnsToRender = [];
        this.lockedColumnsToRender = [];
        this.nonLockedColumnsToRender = [];
        this.hasFooter = false;
        this.unlockedWidth = 0;
    }
    refresh() {
        const currentLevels = this.totalLevels;
        const leafColumns = new Array();
        const lockedLeafColumns = new Array();
        const nonLockedLeafColumns = new Array();
        const lockedColumns = new Array();
        const nonLockedColumns = new Array();
        const allColumns = new Array();
        const leafColumnsToRender = new Array();
        const lockedColumnsToRender = new Array();
        const nonLockedColumnsToRender = new Array();
        let hasFooter = false;
        let unlockedWidth = 0;
        let leafIndex = 0;
        this.totalLevels = 0;
        this.columns().forEach(column => {
            const containerLeafColumns = column.isLocked === true ? lockedLeafColumns : nonLockedLeafColumns;
            const containerColumns = column.isLocked === true ? lockedColumns : nonLockedColumns;
            const toRenderContainer = column.isLocked === true ? lockedColumnsToRender : nonLockedColumnsToRender;
            if (!isColumnGroupComponent(column)) {
                containerLeafColumns.push(column);
                leafColumns.push(column);
                leafColumnsToRender.push.apply(leafColumnsToRender, columnsToRender([column]));
                toRenderContainer.push.apply(toRenderContainer, columnsToRender([column]));
                hasFooter = hasFooter || someLeafColumn(leaf => Boolean(leaf.footerTemplateRef), column);
                if (!column.isLocked) {
                    unlockedWidth += column.width || 0;
                }
                if (column.isSpanColumn) {
                    column.childColumns.forEach(c => {
                        c.leafIndex = leafIndex++;
                    });
                }
                else {
                    column.leafIndex = leafIndex++;
                }
            }
            containerColumns.push(column);
            allColumns.push(column);
            this.totalLevels = column.level > this.totalLevels ? column.level : this.totalLevels;
        });
        this.hasFooter = hasFooter;
        this.leafColumnsToRender = leafColumnsToRender;
        this.lockedColumnsToRender = lockedColumnsToRender;
        this.nonLockedColumnsToRender = nonLockedColumnsToRender;
        this.unlockedWidth = unlockedWidth;
        const changes = reset([this.leafColumns, leafColumns], [this.lockedLeafColumns, lockedLeafColumns], [this.nonLockedLeafColumns, nonLockedLeafColumns], [this.lockedColumns, lockedColumns], [this.allColumns, allColumns], [this.nonLockedColumns, nonLockedColumns]) || currentLevels !== this.totalLevels;
        if (changes) {
            this.changes.emit();
        }
        return changes;
    }
}
export { ɵ0 };
